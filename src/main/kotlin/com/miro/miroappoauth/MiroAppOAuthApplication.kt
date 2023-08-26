package com.miro.miroappoauth

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.miro.miroappoauth.config.AppProperties
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.actuate.endpoint.jackson.EndpointObjectMapper
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.h2.H2ConsoleProperties
import org.springframework.boot.autoconfigure.web.ServerProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.context.ServletWebServerInitializedEvent
import org.springframework.cglib.core.ReflectUtils
import org.springframework.context.annotation.Bean
import org.springframework.context.event.EventListener
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import java.io.File
import java.io.FileOutputStream

@EnableConfigurationProperties(AppProperties::class)
@SpringBootApplication
class MiroAppOAuthApplication {

    @Autowired
    private lateinit var serverProperties: ServerProperties

    @Autowired
    private lateinit var h2ConsoleProperties: H2ConsoleProperties

    private val log = LoggerFactory.getLogger(MiroAppOAuthApplication::class.java)

    @EventListener
    fun onApplicationEvent(event: ServletWebServerInitializedEvent) {
        val protocol = if (serverProperties.ssl != null && serverProperties.ssl.isEnabled) "https" else "http"
        if (event.applicationContext.serverNamespace == "management") {
            log.info("Management server started at {}://localhost:{}/manage", protocol, event.webServer.port)
        } else {
            log.info("Server started at {}://localhost:{}", protocol, event.webServer.port)
            if (h2ConsoleProperties.enabled) {
                log.info(
                    "H2 console started at {}://localhost:{}{} ({})",
                    protocol, event.webServer.port, h2ConsoleProperties.path,
                    if (h2ConsoleProperties.settings.isWebAllowOthers)
                        "!!!accessible remotely, e.g. via tunnel proxy!!!" else "not accessible remotely"
                )
            }
        }
    }

    @Bean
    fun endpointObjectMapper(): EndpointObjectMapper {
        val objectMapper = Jackson2ObjectMapperBuilder.json()
            .featuresToDisable(
                SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,
                SerializationFeature.WRITE_DURATIONS_AS_TIMESTAMPS
            )
            .serializationInclusion(JsonInclude.Include.NON_NULL)
            .featuresToEnable(SerializationFeature.INDENT_OUTPUT)
            .build<ObjectMapper>()
        return EndpointObjectMapper { objectMapper }
    }
}

fun main(args: Array<String>) {
    if (false) {
        initGeneratedClassHandler("cglib")
    }
    runApplication<MiroAppOAuthApplication>(*args)
}

fun initGeneratedClassHandler(targetPath: String?) {
    val dir = File(targetPath)
    dir.mkdirs()
    ReflectUtils.setGeneratedClassHandler { className, classContent ->
        FileOutputStream(File(dir, "$className.class")).use {
                out -> out.write(classContent)
        }
    }
}
