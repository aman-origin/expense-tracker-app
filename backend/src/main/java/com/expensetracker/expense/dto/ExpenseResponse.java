package com.expensetracker.expense.dto;

import com.expensetracker.category.dto.CategoryResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@Schema(description = "Expense response")
public class ExpenseResponse {

    @Schema(example = "1")
    private Long id;

    @Schema(example = "Lunch at restaurant")
    private String title;

    @Schema(example = "250.00")
    private BigDecimal amount;

    @Schema(example = "Had lunch with team")
    private String description;

    @Schema(example = "2024-01-15")
    private LocalDate date;

    private CategoryResponse category;

    @Schema(example = "2024-01-15T10:30:00")
    private LocalDateTime createdAt;

    @Schema(example = "2024-01-15T10:30:00")
    private LocalDateTime updatedAt;
}