package com.example.flowarchive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 【Spring Boot 起動クラス】
 * 
 * このクラスはアプリケーションの「エンジン」を始動させる役割を持ちます。
 * 
 * @SpringBootApplication
 * このアノテーションは非常に強力で、以下の3つの役割を兼ね備えています：
 * 1. @Configuration: 
 *    このクラス内で @Bean を使ったカスタマイズ設定ができるようになります。
 * 2. @EnableAutoConfiguration: 
 *    Spring Boot の「魔法」の本体です。プロジェクトに追加されたライブラリ（pom.xml）を
 *    見て、必要な設定（DB接続、Webサーバの起動など）を自動で行います。
 * 3. @ComponentScan: 
 *    このクラスがあるパッケージ（com.example.flowarchive）以下の全てのフォルダをスキャンし、
 *    @RestController や @Service などのアノテーションがついたクラスを見つけて
 *    Spring の管理下に置きます。
 */
@SpringBootApplication
public class FlowArchiveApplication {

    /**
     * Java アプリケーションの開始地点です。
     * 
     * @param args コマンドライン引数（今回は使用しません）
     */
    public static void main(String[] args) {
        // SpringApplication.run() を実行することで：
        // 1. 内部で Tomcat（Webサーバ）が立ち上がる
        // 2. Spring の各種機能が初期化される
        // 3. アプリケーションがリクエストを待機できる状態になる
        SpringApplication.run(FlowArchiveApplication.class, args);
    }
}
