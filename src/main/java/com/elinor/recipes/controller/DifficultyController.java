package com.elinor.recipes.controller;

import com.elinor.recipes.model.enumeration.Difficulty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DifficultyController {

    @GetMapping("/difficulty")
    public Difficulty[] getDifficulties() {
        return Difficulty.values();
    }
}