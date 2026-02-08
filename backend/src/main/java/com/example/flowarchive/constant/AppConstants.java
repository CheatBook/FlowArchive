package com.example.flowarchive.constant;

/**
 * 【アプリケーション定数】
 * 
 * URL パスや設定値など、アプリ全体で共有する定数を管理します。
 */
public class AppConstants {
    
    // API のベースパス
    public static final String API_BASE_PATH = "/api/knowledge";
    
    // フロントエンドの URL（CORS 設定用）
    public static final String FRONTEND_URL_DEV = "http://localhost:5173";
    public static final String FRONTEND_URL_LEGACY = "http://localhost:3000";

    // プライベートコンストラクタ（インスタンス化を禁止）
    private AppConstants() {}
}
