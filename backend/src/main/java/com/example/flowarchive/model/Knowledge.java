package com.example.flowarchive.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * 【エンティティクラス：Knowledge】
 * 
 * データベースの「テーブル」を Java の「クラス」として表現したものです。
 * JPA (Java Persistence API) という仕組みを使い、このクラスの変数が
 * そのまま DB のカラム（列）になります。
 */
@Entity // 「このクラスは DB のテーブルに対応します」という宣言
@Data   // Lombok ライブラリ：Getter/Setter/toString などを自動生成（コードをスッキリさせるため）
public class Knowledge {

    /**
     * ID（主キー）
     * 
     * @Id: この変数がテーブルの主キーであることを示します。
     * @GeneratedValue: ID の値をどう決めるか。
     * IDENTITY は「DBのオートインクリメント機能（自動採番）を使う」設定です。
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 記事のタイトル
     */
    private String title;

    /**
     * 記事の本文（Markdown 形式）
     * 
     * @Lob: "Large Object" の略。
     * 通常の String は DB では短い文字列（VARCHR）になりますが、
     * 本文は長くなる可能性があるため、大容量用の型（TEXT型など）として定義します。
     */
    @Lob
    private String content;

    /**
     * 作成日時
     * 
     * @CreationTimestamp: 
     * Hibernate（JPAの実装体）の機能。
     * 初めて保存（INSERT）される時に、システム時刻を自動でセットしてくれます。
     */
    @CreationTimestamp
    private LocalDateTime createdAt;

    /**
     * 更新日時
     * 
     * @UpdateTimestamp: 
     * データが更新（UPDATE）されるたびに、その時の時刻で上書きしてくれます。
     */
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
