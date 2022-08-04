package com.miro.miroappoauth.utils

import jakarta.servlet.http.HttpServletRequest
import org.springframework.util.Assert
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

fun getCurrentRequest(): HttpServletRequest {
    val attrs = RequestContextHolder.getRequestAttributes()
    Assert.state(attrs is ServletRequestAttributes, "No current ServletRequestAttributes")
    return (attrs as ServletRequestAttributes?)!!.request
}
