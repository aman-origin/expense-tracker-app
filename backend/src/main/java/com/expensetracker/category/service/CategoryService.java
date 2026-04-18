package com.expensetracker.category.service;

import com.expensetracker.category.dto.CategoryRequest;
import com.expensetracker.category.dto.CategoryResponse;
import com.expensetracker.category.entity.Category;
import com.expensetracker.category.mapper.CategoryMapper;
import com.expensetracker.category.repository.CategoryRepository;
import com.expensetracker.common.exception.ResourceNotFoundException;
import com.expensetracker.user.entity.User;
import com.expensetracker.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final UserService userService;

    public CategoryResponse createCategory(CategoryRequest request, String email) {
        User user = userService.findByEmail(email);

        if (categoryRepository.existsByNameAndUserId(request.getName(), user.getId())) {
            throw new IllegalArgumentException("Category already exists: " + request.getName());
        }

        Category category = Category.builder()
                .name(request.getName())
                .user(user)
                .build();

        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    public List<CategoryResponse> getAllCategories(String email) {
        User user = userService.findByEmail(email);
        return categoryRepository.findAllByUserIdOrGlobal(user.getId())
                .stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Used internally by expense module — returns entity
    public Category findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }
}