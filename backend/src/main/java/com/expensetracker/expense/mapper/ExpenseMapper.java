package com.expensetracker.expense.mapper;

import com.expensetracker.category.mapper.CategoryMapper;
import com.expensetracker.expense.dto.ExpenseResponse;
import com.expensetracker.expense.entity.Expense;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface ExpenseMapper {

    @Mapping(target = "category", source = "category")
    ExpenseResponse toResponse(Expense expense);
}