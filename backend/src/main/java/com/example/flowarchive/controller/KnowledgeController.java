package com.example.flowarchive.controller;

import com.example.flowarchive.model.Knowledge;
import com.example.flowarchive.repository.KnowledgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/knowledge")
@CrossOrigin(origins = {"http://localhost:5173"})
public class KnowledgeController {

    @Autowired
    private KnowledgeRepository repository;

    @GetMapping
    public List<Knowledge> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Knowledge> getById(@PathVariable Long id) {
        System.out.println("getAll");
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Knowledge create(@RequestBody Knowledge knowledge) {
        return repository.save(knowledge);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Knowledge> update(@PathVariable Long id, @RequestBody Knowledge knowledgeDetails) {
        return repository.findById(id)
                .map(knowledge -> {
                    knowledge.setTitle(knowledgeDetails.getTitle());
                    knowledge.setContent(knowledgeDetails.getContent());
                    return ResponseEntity.ok(repository.save(knowledge));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return repository.findById(id)
                .map(knowledge -> {
                    repository.delete(knowledge);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
