package com.expensetracker.category.mapper;

import com.expensetracker.category.dto.CategoryResponse;
import com.expensetracker.category.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    @Mapping(target = "global", expression = "java(category.getUser() == null)")
    CategoryResponse toResponse(Category category);
}