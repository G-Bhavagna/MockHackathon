package com.demo.CrudOperation.service;

import com.demo.CrudOperation.entities.User;

import java.util.List;

public interface UserService {
    User addUser(User user);
    User updateUser(User user);
    User deleteUser(int id);
    List<User> getAllUsers();
    User getUserByEmail(String email);

    User getById(String id);
}
