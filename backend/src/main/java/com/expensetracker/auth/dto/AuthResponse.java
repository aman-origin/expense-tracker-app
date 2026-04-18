package com.expensetracker.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Authentication response with JWT token")
public class AuthResponse {

    @Schema(example = "eyJhbGciOiJIUzI1NiJ9...")
    private String token;

    @Schema(example = "Bearer")
    private String tokenType;

    @Schema(example = "1")
    private Long userId;

    @Schema(example = "John Doe")
    private String name;

    @Schema(example = "john@example.com")
    private String email;
}