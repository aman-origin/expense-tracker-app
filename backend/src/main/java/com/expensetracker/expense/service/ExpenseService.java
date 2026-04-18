package com.expensetracker.expense.service;

import com.expensetracker.category.entity.Category;
import com.expensetracker.category.service.CategoryService;
import com.expensetracker.common.exception.ResourceNotFoundException;
import com.expensetracker.common.exception.UnauthorizedException;
import com.expensetracker.expense.dto.ExpenseRequest;
import com.expensetracker.expense.dto.ExpenseResponse;
import com.expensetracker.expense.dto.ExpenseSummaryResponse;
import com.expensetracker.expense.entity.Expense;
import com.expensetracker.expense.mapper.ExpenseMapper;
import com.expensetracker.expense.repository.ExpenseRepository;
import com.expensetracker.user.entity.User;
import com.expensetracker.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final UserService userService;
    private final CategoryService categoryService;

    @Transactional
    public ExpenseResponse createExpense(ExpenseRequest request, String email) {
        User user = userService.findByEmail(email);
        Category category = categoryService.findCategoryById(request.getCategoryId());

        Expense expense = Expense.builder()
                .title(request.getTitle())
                .amount(request.getAmount())
                .description(request.getDescription())
                .date(request.getDate())
                .category(category)
                .user(user)
                .build();

        return expenseMapper.toResponse(expenseRepository.save(expense));
    }

    public List<ExpenseResponse> getAllExpenses(String email) {
        User user = userService.findByEmail(email);
        return expenseRepository.findAllByUserIdOrderByDateDesc(user.getId())
                .stream()
                .map(expenseMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ExpenseResponse getExpenseById(Long id, String email) {
        User user = userService.findByEmail(email);
        Expense expense = findExpenseForUser(id, user.getId());
        return expenseMapper.toResponse(expense);
    }

    @Transactional
    public ExpenseResponse updateExpense(Long id, ExpenseRequest request, String email) {
        User user = userService.findByEmail(email);
        Expense expense = findExpenseForUser(id, user.getId());
        Category category = categoryService.findCategoryById(request.getCategoryId());

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setCategory(category);

        return expenseMapper.toResponse(expenseRepository.save(expense));
    }

    @Transactional
    public void deleteExpense(Long id, String email) {
        User user = userService.findByEmail(email);
        Expense expense = findExpenseForUser(id, user.getId());
        expenseRepository.delete(expense);
    }

    public ExpenseSummaryResponse getSummary(String email) {
        User user = userService.findByEmail(email);
        BigDecimal total = expenseRepository.sumAmountByUserId(user.getId());
        long count = expenseRepository.countByUserId(user.getId());

        return ExpenseSummaryResponse.builder()
                .totalExpense(total != null ? total : BigDecimal.ZERO)
                .expenseCount(count)
                .build();
    }

    // Private helper — ensures user owns the expense
    private Expense findExpenseForUser(Long expenseId, Long userId) {
        return expenseRepository.findByIdAndUserId(expenseId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Expense not found with id: " + expenseId));
    }
}