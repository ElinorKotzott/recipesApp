package com.elinor.recipes.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", nullable = false, length = 30, unique = true)
    private String text;

    @ManyToMany
    @JoinTable(name = "recipes_tags", joinColumns = @JoinColumn(name = "tag_id"), inverseJoinColumns = @JoinColumn(name = "recipe_id"))
    private List<Recipe> recipes;
}

