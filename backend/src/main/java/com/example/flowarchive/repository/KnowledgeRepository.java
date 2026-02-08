package com.example.flowarchive.repository;

import com.example.flowarchive.model.Knowledge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KnowledgeRepository extends JpaRepository<Knowledge, Long> {
}
