package com.miro.miroappoauth.controllers

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTVerificationException
import com.miro.miroappoauth.client.MiroClient
import com.miro.miroappoauth.config.AppProperties
import com.miro.miroappoauth.dto.UserDto
import com.miro.miroappoauth.exceptions.UnauthorizedException
import com.miro.miroappoauth.services.TokenStore
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController

@RestController
class CallRestController(
    private val appProperties: AppProperties,
    private val tokenStore: TokenStore,
    private val miroClient: MiroClient
) {

    private val log = LoggerFactory.getLogger(CallRestController::class.java)

    @GetMapping("/call")
    fun call(
        @RequestHeader("X-Miro-Token") idToken: String
    ): UserDto {
        val jwt = JWT.decode(idToken)
        val claims = jwt.claims
            .map { it.key to it.value.asString() }
            .toMap()
        log.info("Got request $claims")
        try {
            JWT.require(Algorithm.HMAC256(appProperties.clientSecret))
                // to avoid clock minor unsync issues
                .acceptLeeway(180)
                .build()
                .verify(jwt)
        } catch (e: JWTVerificationException) {
            throw UnauthorizedException("Wrong JWT signature: $e")
        }

        val clientId = jwt.getClaim("sub").asString()
        val userId = jwt.getClaim("user").asString()
        val teamId = jwt.getClaim("team").asString()
        val token = tokenStore.get(
            clientId = clientId.toLong(),
            userId = userId.toLong(),
            teamId = teamId.toLong()
        ) ?: throw UnauthorizedException(
            "Token not found for clientId=$clientId, userId=$userId, teamId=$teamId"
        )
        return miroClient.getSelfUser(token.accessToken.accessToken)
    }
}
