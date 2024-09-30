package ru.nshevtsova.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Value("${CLIENT_URL}")
    private String CLIENT_URL;

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/reviews/**")
                .allowedOrigins(CLIENT_URL)
                .allowedMethods("GET", "POST");

        registry.addMapping("/estates/**")
                .allowedOrigins(CLIENT_URL)
                .allowedMethods("GET", "POST", "PUT");
    }
};
