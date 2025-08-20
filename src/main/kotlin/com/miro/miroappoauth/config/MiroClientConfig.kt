package com.miro.miroappoauth.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategies.LOWER_CAMEL_CASE
import com.fasterxml.jackson.databind.PropertyNamingStrategies.SNAKE_CASE
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.databind.SerializationFeature.INDENT_OUTPUT
import com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS
import com.miro.miroappoauth.client.LoggingInterceptor
import com.miro.miroappoauth.client.MiroAuthClient
import com.miro.miroappoauth.client.MiroPublicClient
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.FormHttpMessageConverter
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter

@Configuration
class MiroClientConfig {

    @Bean
    fun miroAuthClient(appProperties: AppProperties): MiroAuthClient {
        val restTemplate = RestTemplateBuilder()
            .requestFactory { -> HttpClientFactory().defaultRequestFactory() }
            .messageConverters(
                FormHttpMessageConverter(),
                StringHttpMessageConverter(),
                MappingJackson2HttpMessageConverter(clientObjectMapper(SNAKE_CASE))
            )
            .interceptors(LoggingInterceptor())
            .rootUri(appProperties.miroApiBaseUrl)
            .build()
        return MiroAuthClient(restTemplate)
    }

    @Bean
    fun miroPublicClient(appProperties: AppProperties): MiroPublicClient {
        val restTemplate = RestTemplateBuilder()
            .requestFactory { -> HttpClientFactory().defaultRequestFactory() }
            .messageConverters(
                StringHttpMessageConverter(),
                MappingJackson2HttpMessageConverter(clientObjectMapper(LOWER_CAMEL_CASE))
            )
            .interceptors(LoggingInterceptor())
            .rootUri(appProperties.miroApiBaseUrl)
            .build()
        return MiroPublicClient(restTemplate)
    }

    private fun clientObjectMapper(propertyNamingStrategy: PropertyNamingStrategy) = Jackson2ObjectMapperBuilder()
        .propertyNamingStrategy(propertyNamingStrategy)
        .featuresToEnable(INDENT_OUTPUT)
        .featuresToDisable(WRITE_DATES_AS_TIMESTAMPS)
        .build<ObjectMapper>()
}
