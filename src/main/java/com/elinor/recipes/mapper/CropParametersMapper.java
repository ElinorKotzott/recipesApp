package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.CropParametersDTO;
import com.elinor.recipes.model.CropParameters;

public class CropParametersMapper {


    public static CropParametersDTO toDTO (CropParameters cropParams) {
        if (cropParams == null) return null;

        CropParametersDTO cropParamsDTO = new CropParametersDTO();
        cropParamsDTO.setX(cropParams.getX());
        cropParamsDTO.setY(cropParams.getY());
        cropParamsDTO.setHeight(cropParams.getHeight());
        cropParamsDTO.setWidth(cropParams.getWidth());
        cropParamsDTO.setXForCropper(cropParams.getXForCropper());
        cropParamsDTO.setYForCropper(cropParams.getYForCropper());
        cropParamsDTO.setZoom(cropParams.getZoom());

        return cropParamsDTO;
    }


    public static CropParameters toEntity (CropParametersDTO cropParamsDTO) {
        if (cropParamsDTO == null) return null;

        CropParameters cropParams = new CropParameters();
        cropParams.setId(cropParamsDTO.getId());
        cropParams.setX(cropParamsDTO.getX());
        cropParams.setY(cropParamsDTO.getY());
        cropParams.setHeight(cropParamsDTO.getHeight());
        cropParams.setWidth(cropParamsDTO.getWidth());
        cropParams.setXForCropper(cropParamsDTO.getXForCropper());
        cropParams.setYForCropper(cropParamsDTO.getYForCropper());
        cropParams.setZoom(cropParamsDTO.getZoom());

        return cropParams;
    }

}


