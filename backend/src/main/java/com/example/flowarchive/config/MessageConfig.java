package com.example.flowarchive.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

/**
 * 【メッセージ管理の設定】
 * 
 * messages_ja.properties などのファイルを読み込むための設定です。
 */
@Configuration
public class MessageConfig {

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        // 読み込むファイル名のベースを指定（messages_ja.properties なら "messages"）
        messageSource.setBasenames("messages");
        // 文字コードを UTF-8 に設定
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
