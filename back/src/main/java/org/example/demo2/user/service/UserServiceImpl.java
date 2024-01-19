package org.example.demo2.user.service;


import org.example.demo2.user.dao.UserDao;
import org.example.demo2.user.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao dao;

    public UserServiceImpl(UserDao dao) {
        super();
        this.dao = dao;
    }

    @Override
    public int insertUser(UserDto dto) {
        //비즈니스 로직이 들어갈 곳
        //controller로부터 dto에 담긴 데이터를 받아서
        //비즈니스 로직 처리 후 dao로 가공된 데이터를 넘기고
        //dao가 db에 접근해서 받아온 데이터를 비즈니스 로직을 거쳐 가공 후
        //컨트롤러에 전달
        return dao.insertUser(dto);
    }

    @Override
    public int deleteUser(int userId) {

        return dao.deleteUser(userId);
    }

    @Override
    public List<UserDto> listUser() {

        return dao.listUser();
    }

    @Override
    public UserDto detailUser(int userId) {
        return dao.detailUser(userId);
    }

    @Override
    public int updateUser(UserDto dto) {

        return dao.updateUser(dto);
    }
}
