package com.example.flowarchive.repository;

import com.example.flowarchive.model.Knowledge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 【リポジトリ：KnowledgeRepository】
 * 
 * データベースへのアクセス（保存、検索、削除など）を一手に引き受けるインターフェースです。
 * 
 * 驚くべきことに、このインターフェースにはメソッドを1つも書く必要がありません。
 * JpaRepository を継承するだけで、Spring Data JPA が実行時に
 * 「SQL を発行して DB とやり取りする実体」を自動的に作成してくれます。
 * 
 * 継承している JpaRepository<Knowledge, Long> の意味：
 * 1. Knowledge: このリポジトリが扱うエンティティ（テーブル）の型
 * 2. Long: そのエンティティの ID (@Id) の型
 */
@Repository // 「これは DB 操作を行うクラスです」という目印
public interface KnowledgeRepository extends JpaRepository<Knowledge, Long> {
    // ここにメソッド名を書くだけで、複雑な検索も可能になります。
    // 例：List<Knowledge> findByTitleContaining(String keyword); 
    // これだけで「タイトルにキーワードを含むものを検索する」機能が手に入ります。
}
