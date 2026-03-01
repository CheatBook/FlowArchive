package com.example.flowarchive.config;

import com.example.flowarchive.constant.AppConstants;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 【共通 CORS 設定】
 * 
 * 大規模開発では、各コントローラに @CrossOrigin を書くのではなく、
 * このように一箇所でまとめて設定を管理するのが一般的です。
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 全ての API パス（/api/**）に対して設定を適用
        registry.addMapping("/api/**")
                // 許可するオリジン（アクセス元）を指定
                .allowedOrigins(AppConstants.FRONTEND_URL_LEGACY, AppConstants.FRONTEND_URL_DEV)
                // 許可する HTTP メソッドを指定
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                // 許可する HTTP ヘッダーを指定
                .allowedHeaders("*")
                // クッキーなどの認証情報を許可するかどうか
                .allowCredentials(true)
                // プリフライトリクエスト（事前確認）の結果をキャッシュする時間（秒）
                .maxAge(3600);
    }
}
