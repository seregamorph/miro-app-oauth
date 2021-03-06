package com.miro.miroappoauth.controllers

import com.miro.miroappoauth.dto.AccessType
import com.miro.miroappoauth.dto.BoardDto
import com.miro.miroappoauth.dto.TeamAccessType
import com.miro.miroappoauth.dto.UserDto
import com.miro.miroappoauth.services.MiroService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RestController

/**
 * Backend calls from web-plugin (see app.tsx).
 */
@RestController
class CallRestController(
    private val miroService: MiroService
) {

    @GetMapping("/get-self-user")
    fun getSelfUser(
        @RequestHeader(HEADER_X_MIRO_TOKEN) jwtToken: String
    ): UserDto {
        val token = miroService.getTokenByJwtToken(jwtToken)

        return miroService.getSelfUser(token)
    }

    @PostMapping("/create-board")
    fun createBoard(
        @RequestHeader(HEADER_X_MIRO_TOKEN) jwtToken: String
    ): BoardDto {
        val token = miroService.getTokenByJwtToken(jwtToken)

        return miroService.createBoard(token, "test", AccessType.PRIVATE, TeamAccessType.PRIVATE)
    }
}

private const val HEADER_X_MIRO_TOKEN = "X-Miro-Token"
