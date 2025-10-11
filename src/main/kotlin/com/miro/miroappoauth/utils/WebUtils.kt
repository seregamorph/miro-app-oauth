package com.miro.miroappoauth.utils

import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.server.ServletServerHttpRequest
import org.springframework.util.Assert
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import org.springframework.web.util.ForwardedHeaderUtils
import org.springframework.web.util.UriComponentsBuilder

fun getCurrentRequest(): HttpServletRequest {
    val attrs = RequestContextHolder.getRequestAttributes()
    Assert.state(attrs is ServletRequestAttributes, "No current ServletRequestAttributes")
    return (attrs as ServletRequestAttributes?)!!.request
}

fun fromHttpRequest(request: ServletServerHttpRequest): UriComponentsBuilder =
    ForwardedHeaderUtils.adaptFromForwardedHeaders(request.uri, request.headers)
