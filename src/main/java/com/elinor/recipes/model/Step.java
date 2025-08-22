package com.elinor.recipes.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "steps", uniqueConstraints = @UniqueConstraint(columnNames = {"recipe_id", "step_number"}))

public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(name = "instruction_text", nullable = false, length = 300)
    private String instructionText;

    @Column(name = "step_number", nullable = false)
    private Integer stepNumber;
}
