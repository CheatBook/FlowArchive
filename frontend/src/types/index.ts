/**
 * 【Knowledge 型定義】
 * 
 * アプリケーション全体で扱う「ナレッジ（記事）」のデータ構造を定義します。
 * TypeScript を使うことで、存在しないプロパティにアクセスしようとした時に
 * エラーで教えてくれるようになり、開発が安全になります。
 */
export interface Knowledge {
    /**
     * ID
     * 新規作成時はまだ ID がないので、オプション（?）にしています。
     */
    id?: number;

    /**
     * 記事のタイトル
     */
    title: string;

    /**
     * 記事の本文（Markdown 形式）
     */
    content: string;

    /**
     * 作成日時（ISO 8601 形式の文字列）
     */
    createdAt?: string;

    /**
     * 更新日時（ISO 8601 形式の文字列）
     */
    updatedAt?: string;
}
