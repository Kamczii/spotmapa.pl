/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.auth;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

/**
 *
 * @author Kamil
 */
@Configuration
public class MessageConfig {
    
    @Bean
public MessageSource messageSource() {
    ReloadableResourceBundleMessageSource messageSource
      = new ReloadableResourceBundleMessageSource();
     
    messageSource.setBasename("classpath:messages");
    messageSource.setDefaultEncoding("UTF-8");
    return messageSource;
}
}
