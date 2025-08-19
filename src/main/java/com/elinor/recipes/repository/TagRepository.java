package com.elinor.recipes.repository;

import com.elinor.recipes.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository <Tag, Long> {
}
