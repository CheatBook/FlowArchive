package com.example.flowarchive.controller;

import com.example.flowarchive.constant.AppConstants;
import com.example.flowarchive.model.Knowledge;
import com.example.flowarchive.repository.KnowledgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 【コントローラ：KnowledgeController】
 * 
 * フロントエンド（React）からの「お願い（HTTPリクエスト）」を受け取る窓口です。
 * ここで「どの URL にアクセスされたら、どの処理をするか」を交通整理します。
 */
@RestController // JSON 形式でデータをやり取りする Web API であることを宣言
@RequestMapping(AppConstants.API_BASE_PATH) // このクラスの処理はすべてベースパスから始まる URL になります
@CrossOrigin(origins = {AppConstants.FRONTEND_URL_LEGACY, AppConstants.FRONTEND_URL_DEV}) // 開発中のフロントエンドからのアクセスを許可
public class KnowledgeController {

    /**
     * Dependency Injection (依存性の注入)
     * 
     * @Autowired: 
     * Spring があらかじめ作っておいた KnowledgeRepository の実体を、
     * この変数に自動的にセットしてくれます。自分で "new" する必要はありません。
     */
    @Autowired
    private KnowledgeRepository repository;

    /**
     * 【全件取得（ページネーション対応）】
     * HTTP メソッド: GET
     * URL: /api/knowledge?page=0&size=10&sort=createdAt,desc
     * 
     * @param pageable ページング情報（Spring が自動でリクエストパラメータから構築します）
     * @return ページ情報を含むナレッジのリスト
     */
    @GetMapping
    public Page<Knowledge> getAll(
            @PageableDefault(size = 6, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        // repository.findAll(pageable) は SQL の "SELECT * FROM knowledge LIMIT 6 OFFSET ..." を実行します
        return repository.findAll(pageable);
    }

    /**
     * 【1件取得】
     * HTTP メソッド: GET
     * URL: /api/knowledge/{id}
     * 
     * @param id URL の末尾についた ID
     * @return 見つかればデータと 200 OK、なければ 404 Not Found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Knowledge> getById(@PathVariable Long id) {
        // findById は「見つからない可能性」を考慮して Optional 型を返します
        return repository.findById(id)
                .map(ResponseEntity::ok) // 値があれば 200 OK で包む
                .orElse(ResponseEntity.notFound().build()); // なければ 404 エラーを返す
    }

    /**
     * 【新規作成】
     * HTTP メソッド: POST
     * URL: /api/knowledge
     * 
     * @param knowledge フロントから送られてきた JSON データ
     * @return 保存された後のデータ（IDなどが付与されている）
     */
    @PostMapping
    public Knowledge create(@RequestBody Knowledge knowledge) {
        // repository.save() は SQL の "INSERT INTO ..." を実行します
        return repository.save(knowledge);
    }

    /**
     * 【更新】
     * HTTP メソッド: PUT
     * URL: /api/knowledge/{id}
     * 
     * @param id 更新したいデータの ID
     * @param knowledgeDetails 新しい内容
     * @return 更新後のデータ
     */
    @PutMapping("/{id}")
    public ResponseEntity<Knowledge> update(@PathVariable Long id, @RequestBody Knowledge knowledgeDetails) {
        return repository.findById(id)
                .map(knowledge -> {
                    // 1. DB から見つかった既存のデータに
                    // 2. フロントから送られてきた新しい値をセットして
                    knowledge.setTitle(knowledgeDetails.getTitle());
                    knowledge.setContent(knowledgeDetails.getContent());
                    // 3. 上書き保存（UPDATE）する
                    return ResponseEntity.ok(repository.save(knowledge));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 【削除】
     * HTTP メソッド: DELETE
     * URL: /api/knowledge/{id}
     * 
     * @param id 削除したいデータの ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return repository.findById(id)
                .map(knowledge -> {
                    // DB から削除（DELETE）する
                    repository.delete(knowledge);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
