package com.elinor.recipes.controller;

import com.elinor.recipes.dto.TagDTO;
import com.elinor.recipes.mapper.TagMapper;
import com.elinor.recipes.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagsController {

    @Autowired
    private TagRepository tagRepository;

    @GetMapping("/tags")
    public ResponseEntity<List<TagDTO>> getTagList() {
        return ResponseEntity.ok(TagMapper.toDTOList(tagRepository.findAll()));
    }
}
