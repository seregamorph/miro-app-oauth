package com.miro.miroappoauth.dto

import tools.jackson.databind.PropertyNamingStrategies
import tools.jackson.databind.annotation.JsonNaming

/**
 * Miro response payload Access Token data.
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy::class)
data class AccessTokenDto(
    val userId: Long,
    val tokenType: String,
    val teamId: Long,
    val accessToken: String,
    val refreshToken: String?,
    val scope: String,
    val expiresIn: Int
)
