package com.miro.miroappoauth.config

import com.miro.miroappoauth.client.LoggingInterceptor
import com.miro.miroappoauth.client.MiroAuthClient
import com.miro.miroappoauth.client.MiroPublicClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.http.converter.json.JacksonJsonHttpMessageConverter
import org.springframework.web.client.RestClient
import tools.jackson.databind.PropertyNamingStrategies.LOWER_CAMEL_CASE
import tools.jackson.databind.PropertyNamingStrategies.SNAKE_CASE
import tools.jackson.databind.PropertyNamingStrategy
import tools.jackson.databind.SerializationFeature
import tools.jackson.databind.cfg.DateTimeFeature
import tools.jackson.databind.json.JsonMapper

@Configuration(proxyBeanMethods = false)
class MiroClientConfig {

    @Bean
    fun miroAuthClient(appProperties: AppProperties): MiroAuthClient {
        val restTemplate = RestClient.builder()
            .requestFactory(HttpClientFactory().defaultRequestFactory())
            .configureMessageConverters { builder ->
                builder.registerDefaults()
                    .withStringConverter(StringHttpMessageConverter())
                    .withJsonConverter(JacksonJsonHttpMessageConverter(clientObjectMapper(SNAKE_CASE)))
            }
            .requestInterceptor(LoggingInterceptor())
            .baseUrl(appProperties.miroApiBaseUrl)
            .build()
        return MiroAuthClient(restTemplate)
    }

    @Bean
    fun miroPublicClient(appProperties: AppProperties): MiroPublicClient {
        val restTemplate = RestClient.builder()
            .requestFactory(HttpClientFactory().defaultRequestFactory())
            .configureMessageConverters { builder ->
                builder.registerDefaults()
                    .withStringConverter(StringHttpMessageConverter())
                    .withJsonConverter(JacksonJsonHttpMessageConverter(clientObjectMapper(LOWER_CAMEL_CASE)))
            }
            .requestInterceptor(LoggingInterceptor())
            .baseUrl(appProperties.miroApiBaseUrl)
            .build()
        return MiroPublicClient(restTemplate)
    }

    private fun clientObjectMapper(propertyNamingStrategy: PropertyNamingStrategy) = JsonMapper.builder()
        .propertyNamingStrategy(propertyNamingStrategy)
        .enable(SerializationFeature.INDENT_OUTPUT)
        .disable(DateTimeFeature.WRITE_DATES_AS_TIMESTAMPS)
        .build()
}
