package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {ImageMapper.class})
public interface UserMapper {

    UserDTO toDTO(User user);

    User toEntity(UserDTO userDTO);

    User updateEntity(UserDTO dto, @MappingTarget User entity);
}
