package com.elinor.recipes.repository;

import com.elinor.recipes.model.Step;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StepRepository extends JpaRepository<Step, Long> {
}
