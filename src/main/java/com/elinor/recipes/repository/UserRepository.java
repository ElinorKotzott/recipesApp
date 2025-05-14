package com.elinor.recipes.repository;

import com.elinor.recipes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
