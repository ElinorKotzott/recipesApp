package com.elinor.recipes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageInfoDTO {
    private List<RecipeDTO> recipeList;
    private int currentPage;
    private int totalPages;
    private long totalElements;
}
