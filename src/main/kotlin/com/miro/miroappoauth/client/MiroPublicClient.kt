package com.miro.miroappoauth.client

import com.miro.miroappoauth.dto.*
import com.miro.miroappoauth.dto.CreateBoardDto.SharingPolicyDto
import org.springframework.web.client.RestClient

/**
 * See [Miro REST API](https://developers.miro.com/reference).
 * Note: we use camelCase for json parsing here.
 */
class MiroPublicClient(
    private val rest: RestClient
) {

    fun getSelfUser(accessToken: String): UserDto {
        return rest.get()
            .uri("/v1/users/me")
            .headers { it.setBearerAuth(accessToken) }
            .retrieve()
            .body(UserDto::class.java)!!
    }

    fun getSelfUserV2(accessToken: String, userId: Long): UserDto {
        return rest.get()
            .uri("/v2/users/{userId}", userId)
            .headers { it.setBearerAuth(accessToken) }
            .retrieve()
            .body(UserDto::class.java)!!
    }

    fun createBoard(
        accessToken: String,
        name: String,
        accessType: AccessType,
        teamAccessType: TeamAccessType
    ): BoardDto {
        return rest.post()
            .uri("/v2alpha/boards")
            .headers { it.setBearerAuth(accessToken) }
            .body(CreateBoardDto(name, SharingPolicyDto(accessType, teamAccessType)))
            .retrieve()
            .body(BoardDto::class.java)!!
    }

    // todo GET https://api.miro.com/v1/oauth-token
}
