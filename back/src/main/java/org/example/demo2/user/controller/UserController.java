package org.example.demo2.user.controller;


import org.example.demo2.user.dto.UserDto;
import org.example.demo2.user.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {//front로부터 json의 형태로 데이터를 받아옴
    private final UserService service;

    public UserController(UserService service) {
        super();
        this.service = service;
    }

    // 유저 목록
    @GetMapping("/users")
    public List<UserDto> listUser() {

        return service.listUser();
    }

    // 유저 상세
    @GetMapping("/users/{userId}")
    public UserDto detailUser(@PathVariable int userId) {
        System.out.println(userId);
        return service.detailUser(userId);
    }

    // 유저 회원가입
    @PostMapping("/users")
    public int insertUser(@RequestBody UserDto dto) {
        System.out.println(dto);
        return service.insertUser(dto);
    }

    // 유저 수정
    @PutMapping("/users")
    public int updateUser(@RequestBody UserDto dto) {

        return service.updateUser(dto);
    }

    // 유저 회원탈퇴
    @DeleteMapping("/users/{userId}")
    public int deleteUser(@PathVariable int userId) {
        return service.deleteUser(userId);
    }
}
