package com.elinor.recipes.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.*;

@Getter
@Setter
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

    @Column(name = "image_data", columnDefinition = "TEXT")
    private String imageData;

    @Column(name = "image_type", length = 50)
    private String imageType;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @ManyToMany(mappedBy = "recipes")
    private List<Tag> tagList = new ArrayList<>();
}

