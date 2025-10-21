package com.elinor.recipes.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "crop_parameters")
public class CropParameters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double x;

    @Column(nullable = false)
    private Double y;

    @Column(nullable = false)
    private Double width;

    @Column(nullable = false)
    private Double height;

    @Column(nullable = false)
    private Double zoom;
}
