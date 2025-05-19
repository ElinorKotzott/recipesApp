package com.elinor.recipes.controller;

import com.elinor.recipes.model.User;
import com.elinor.recipes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        List<User> userList = userService.allUsers();
        userList.get(0).setUsername("Alice");
        return userService.allUsers();
    }
}
