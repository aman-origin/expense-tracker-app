package com.expensetracker.expense.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@Schema(description = "Expense summary")
public class ExpenseSummaryResponse {

    @Schema(example = "15000.00")
    private BigDecimal totalExpense;

    @Schema(example = "25")
    private long expenseCount;
}