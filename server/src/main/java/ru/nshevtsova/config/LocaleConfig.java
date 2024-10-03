package ru.nshevtsova.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import java.util.Locale;

@Configuration
public class LocaleConfig {

    @Bean
    public LocaleResolver localeResolver() {
        AcceptHeaderLocaleResolver resolver = new AcceptHeaderLocaleResolver();
        resolver.setDefaultLocale(new Locale("ru", "RU"));
        return resolver;

        // If using SessionLocaleResolver:
        // SessionLocaleResolver resolver = new SessionLocaleResolver();
        // resolver.setDefaultLocale(new Locale("ru", "RU"));
        // return resolver;
    }
}
