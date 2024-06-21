package com.demo.CrudOperation.controller;

import com.demo.CrudOperation.entities.User;
import com.demo.CrudOperation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    private UserService userService;

    @GetMapping("/getUserByEmail/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/getUserById/{id}")
    public User getUserById(@PathVariable("id") String id) {
        return userService.getById(id);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.addUser(user);
    }
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User temp = userService.getUserByEmail(user.getEmail());
        if (temp != null && temp.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(temp);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @PutMapping("/update")
    public User update(@RequestBody User user) {
        return userService.updateUser(user);
    }
}
