package com.elinor.recipes.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.*;

@Data
@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "description", length = 300)
    private String description;

    @Column(name = "prep_time")
    private Integer prepTime;

    @Column(name = "cooking_time")
    private Integer cookingTime;

    @Lob
    @Column(name = "image")
    private String image;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @ManyToMany(mappedBy = "favoriteRecipesList")
    private List<User> favoritesList = new ArrayList<>();

    @ManyToMany(mappedBy = "recipes")
    private List<Tag> tagList = new ArrayList<>();
}

