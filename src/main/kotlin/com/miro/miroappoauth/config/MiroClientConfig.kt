package com.miro.miroappoauth.config

import com.miro.miroappoauth.client.LoggingInterceptor
import com.miro.miroappoauth.client.MiroAuthClient
import com.miro.miroappoauth.client.MiroPublicClient
import org.springframework.boot.restclient.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.FormHttpMessageConverter
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.http.converter.json.JacksonJsonHttpMessageConverter
import tools.jackson.databind.PropertyNamingStrategies.LOWER_CAMEL_CASE
import tools.jackson.databind.PropertyNamingStrategies.SNAKE_CASE
import tools.jackson.databind.PropertyNamingStrategy
import tools.jackson.databind.SerializationFeature
import tools.jackson.databind.cfg.DateTimeFeature
import tools.jackson.databind.json.JsonMapper

@Configuration
class MiroClientConfig {

    @Bean
    fun miroAuthClient(appProperties: AppProperties): MiroAuthClient {
        val restTemplate = RestTemplateBuilder()
            .requestFactory { HttpClientFactory().defaultRequestFactory() }
            .messageConverters(
                FormHttpMessageConverter(),
                StringHttpMessageConverter(),
                JacksonJsonHttpMessageConverter(clientObjectMapper(SNAKE_CASE))
            )
            .interceptors(LoggingInterceptor())
            .rootUri(appProperties.miroApiBaseUrl)
            .build()
        return MiroAuthClient(restTemplate)
    }

    @Bean
    fun miroPublicClient(appProperties: AppProperties): MiroPublicClient {
        val restTemplate = RestTemplateBuilder()
            .requestFactory { HttpClientFactory().defaultRequestFactory() }
            .messageConverters(
                StringHttpMessageConverter(),
                JacksonJsonHttpMessageConverter(clientObjectMapper(LOWER_CAMEL_CASE))
            )
            .interceptors(LoggingInterceptor())
            .rootUri(appProperties.miroApiBaseUrl)
            .build()
        return MiroPublicClient(restTemplate)
    }

    private fun clientObjectMapper(propertyNamingStrategy: PropertyNamingStrategy) = JsonMapper.builder()
        .propertyNamingStrategy(propertyNamingStrategy)
        .enable(SerializationFeature.INDENT_OUTPUT)
        .disable(DateTimeFeature.WRITE_DATES_AS_TIMESTAMPS)
        .build()
}
