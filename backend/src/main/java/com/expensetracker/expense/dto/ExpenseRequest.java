package com.expensetracker.expense.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Schema(description = "Expense creation/update request")
public class ExpenseRequest {

    @NotBlank(message = "Title is required")
    @Schema(example = "Lunch at restaurant")
    private String title;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @Schema(example = "250.00")
    private BigDecimal amount;

    @Schema(example = "Had lunch with team")
    private String description;

    @NotNull(message = "Date is required")
    @Schema(example = "2024-01-15")
    private LocalDate date;

    @NotNull(message = "Category ID is required")
    @Schema(example = "1")
    private Long categoryId;
}