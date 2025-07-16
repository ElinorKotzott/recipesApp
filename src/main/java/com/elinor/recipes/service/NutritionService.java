package com.elinor.recipes.service;

import com.elinor.recipes.dto.EdamamAPIResponseDTO;
import com.elinor.recipes.dto.NutritionInfoDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
public class NutritionService {

    @Value("${edamam.api.foodUrl}")
    private String foodApiUrl;

    @Value("${edamam.api.appId}")
    private String appId;

    @Value("${edamam.api.appKey}")
    private String appKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public NutritionInfoDTO calculateNutrition(List<String> ingredients, Integer servings) {

        if (servings == null || servings <= 0) {
            System.err.println("Invalid servings: " + servings);
            return new NutritionInfoDTO(null, null, null, null);
        }

        Double totalProtein = null;
        Double totalCarbs = null;
        Double totalFat = null;
        Double totalEnergy = null;

        for (String ingredient : ingredients) {
            try {
                String url = foodApiUrl + "?app_id=" + appId + "&app_key=" + appKey +
                        "&ingr=" + URLEncoder.encode(ingredient, StandardCharsets.UTF_8);

                ResponseEntity<EdamamAPIResponseDTO> response =
                        restTemplate.getForEntity(url, EdamamAPIResponseDTO.class);

                EdamamAPIResponseDTO data = response.getBody();

                if (data != null && data.getParsed() != null && !data.getParsed().isEmpty()) {
                    Map<String, Double> nutrients = data.getParsed().get(0).getFood().getNutrients();

                    Double protein = nutrients.get("PROCNT");
                    Double carbs = nutrients.get("CHOCDF");
                    Double fat = nutrients.get("FAT");
                    Double energy = nutrients.get("ENERC_KCAL");

                    totalProtein = (totalProtein == null) ? protein : totalProtein + protein;
                    totalCarbs = (totalCarbs == null) ? carbs : totalCarbs + carbs;
                    totalFat = (totalFat == null) ? fat : totalFat + fat;
                    totalEnergy = (totalEnergy == null) ? energy : totalEnergy + energy;
                }
            } catch (Exception ex) {
                System.err.println("Failed to fetch nutrition info for: " + ingredient + ". Error: " + ex.getMessage());
            }
        }

        return new NutritionInfoDTO(
                (totalProtein == null) ? null : totalProtein / servings,
                (totalCarbs == null) ? null : totalCarbs / servings,
                (totalFat == null) ? null : totalFat / servings,
                (totalEnergy == null) ? null : totalEnergy / servings
        );
    }

}
