package com.elinor.recipes.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_data", columnDefinition = "TEXT")
    private String imageData;

    @Column(name = "image_type", length = 50)
    private String imageType;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "crop_parameters_id", referencedColumnName = "id")
    private CropParameters cropParameters;
}
