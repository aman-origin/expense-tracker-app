package com.expensetracker.category.repository;

import com.expensetracker.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Return global categories + user-specific categories
    @Query("SELECT c FROM Category c WHERE c.user IS NULL OR c.user.id = :userId")
    List<Category> findAllByUserIdOrGlobal(Long userId);

    boolean existsByNameAndUserId(String name, Long userId);
    boolean existsByNameAndUserIsNull(String name);
}