package com.miro.miroappoauth.client

import com.miro.miroappoauth.dto.AccessTokenDto
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.client.RestClient
import org.springframework.web.client.body

/**
 * See [Miro REST API](https://developers.miro.com/reference).
 * Note: we use snake_case for json parsing here.
 */
class MiroAuthClient(
    private val rest: RestClient
) {

    /**
     * See [Miro REST API Authorization](https://developers.miro.com/reference#oauth-20-authorization-v2).
     */
    fun getAccessToken(code: String, redirectUri: String, clientId: Long, clientSecret: String): AccessTokenDto {
        if (true) {
            val form = LinkedMultiValueMap<String, String>()
            form.add("grant_type", "authorization_code")
            form.add("client_id", clientId.toString())
            form.add("client_secret", clientSecret)
            form.add("code", code)
            form.add("redirect_uri", redirectUri)

            return rest.post()
                .uri("/v1/oauth/token")
                .body(form)
                .retrieve()
                .body(AccessTokenDto::class.java)!!
        } else {
            return rest.post()
                .uri(
                    "/v1/oauth/token" +
                            "?grant_type=authorization_code" +
                            "&client_id={client_id}" +
                            "&client_secret={client_secret}" +
                            "&code={code}" +
                            "&redirect_uri={redirect_uri}", clientId, clientSecret, code, redirectUri
                )
                .retrieve().body(AccessTokenDto::class.java)!!
        }
    }

    fun refreshToken(refreshToken: String, clientId: Long, clientSecret: String): AccessTokenDto {
        val form = LinkedMultiValueMap<String, String>()
        form.add("grant_type", "refresh_token")
        form.add("client_id", clientId.toString())
        form.add("refresh_token", refreshToken)
        form.add("client_secret", clientSecret)

        return rest.post()
            .uri("/v1/oauth/token")
            .body(form)
            .retrieve()
            .body(AccessTokenDto::class.java)!!
    }

    /**
     * [Revoking tokens](https://developers.miro.com/reference#section-revoking-tokens)
     */
    fun revokeToken(accessToken: String) {
        val form = LinkedMultiValueMap<String, String>()
        form.add("access_token", accessToken)

        rest.post()
            .uri("/v1/oauth/revoke")
            .body(form)
            .retrieve()
            .body<Unit>()
    }
}
