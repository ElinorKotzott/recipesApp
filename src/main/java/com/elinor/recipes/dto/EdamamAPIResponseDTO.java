package com.elinor.recipes.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class EdamamAPIResponseDTO {
    private List<ParsedItem> parsed;

    @Data
    public static class ParsedItem {
        private Food food;
    }

    @Data
    public static class Food {
        private String label;
        private Map<String, Double> nutrients;
    }
}
