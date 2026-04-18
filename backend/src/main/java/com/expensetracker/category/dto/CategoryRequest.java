package com.expensetracker.category.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Category creation request")
public class CategoryRequest {

    @NotBlank(message = "Category name is required")
    @Schema(example = "Food")
    private String name;
}