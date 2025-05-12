package com.elinor.recipes.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false, length = 30)
    private String name;
    @ToString.Exclude
    @Column(name = "password", nullable = false, length = 100)
    private String password;
    @Column(name = "email", nullable = false, length = 40, unique = true)
    private String email;
    @Column(name = "bio")
    private String bio;
    @Column(name = "profile_picture")
    private String profilePicture;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
}


