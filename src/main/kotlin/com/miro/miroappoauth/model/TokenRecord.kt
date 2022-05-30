package com.miro.miroappoauth.model

import java.net.URI
import java.time.OffsetDateTime
import java.util.*

/**
 * For UI view.
 */
data class TokenRecord(
    /**
     * Only access token value
     */
    val accessTokenValue: String,
    /**
     * Serialized AccessTokenDto
     */
    val accessToken: String,
    var state: String,
    val createdTime: OffsetDateTime,
    var lastAccessedTime: OffsetDateTime?,
    val checkValidUrl: URI,
    val refreshUrl: URI?,
    val revokeUrl: URI
) {
    fun getRegion(): String {
        val parts = accessTokenValue.split('_')
        return if (parts.size < 2) {
            ""
        } else {
            val regionEncoded = parts[0]
            try {
                val decoded: ByteArray = Base64.getDecoder().decode(regionEncoded)
                String(decoded)
            } catch (e: IllegalArgumentException) {
                ""
            }
        }
    }
}
