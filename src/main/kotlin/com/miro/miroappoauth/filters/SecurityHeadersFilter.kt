package com.miro.miroappoauth.filters

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.CacheControl
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

/**
 * https://developers.miro.com/docs/security-guidelines#introduction
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 */
@Component
class SecurityHeadersFilter : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        response.setHeader(
            HttpHeaders.CACHE_CONTROL,
            CacheControl.noStore().mustRevalidate().headerValue
        )

        filterChain.doFilter(request, response)
    }
}
