# FlowArchive - ナレッジデータベース

ナレッジデータベースの最小構成Webアプリです。

## 構成
- **フロントエンド**: React + TypeScript (Vite)
- **バックエンド**: Java (Spring Boot)
- **データベース**: PostgreSQL (Docker)

## 実行方法

### 1. データベースの起動 (Docker)
ルートディレクトリで以下を実行します。
```bash
docker-compose up -d
```

### 2. バックエンドの起動
`backend` ディレクトリに移動して実行します。
```bash
mvn spring-boot:run
```
※ ポート 8080 で起動します。PostgreSQLへの接続設定は `application.properties` に記述されています。

### 3. フロントエンドの起動
`frontend` ディレクトリに移動して実行します。
```bash
npm install
npm run dev
```
※ デフォルトでは `http://localhost:5173` で起動します。

## 機能
- ナレッジの新規作成
- ナレッジの一覧表示
- ナレッジの編集
- ナレッジの削除
- 日本語UI
- H2コンソールによるデータ確認 (`http://localhost:8080/h2-console`)
