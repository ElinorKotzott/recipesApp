package com.elinor.recipes.controller;

import com.elinor.recipes.model.enumeration.Unit;
import org.springframework.web.bind.annotation.GetMapping;

public class UnitsController {

    @GetMapping("/units")
    public Unit[] getUnits() {
        return Unit.values();
    }
}
