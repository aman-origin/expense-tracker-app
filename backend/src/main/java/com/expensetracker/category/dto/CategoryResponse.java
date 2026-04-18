package com.expensetracker.category.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Category response")
public class CategoryResponse {

    @Schema(example = "1")
    private Long id;

    @Schema(example = "Food")
    private String name;

    @Schema(example = "false")
    private boolean global;
}