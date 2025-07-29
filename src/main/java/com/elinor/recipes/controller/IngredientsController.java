package com.elinor.recipes.controller;

import com.elinor.recipes.dto.IngredientDTO;
import com.elinor.recipes.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IngredientsController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping("/ingredients")
    public ResponseEntity<List<IngredientDTO>> getIngredientList() {
        return ResponseEntity.ok(IngredientDTO.toDTOList(ingredientRepository.findAll()));
    }
}
