package com.infosys.lostFoundApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.bean.LostFoundUser;
import com.infosys.lostFoundApplication.dao.LostFoundUserRepository;

@Service
public class LostFoundService implements UserDetailsService {

    @Autowired
    private LostFoundUserRepository repository;

    public void save(LostFoundUser user) {
        repository.save(user);
    }

    public LostFoundUser getUser(String username) {
        return repository.findById(username).orElse(null);
    }

    public String getRole(String username) {
        LostFoundUser user = repository.findById(username).orElse(null);
        return user != null ? user.getRole() : null;
    }

    public List<LostFoundUser> getAllStudents() {
        return repository.getAllStudents();
    }

    public void deleteStudent(String username) {
        repository.deleteById(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        LostFoundUser user = repository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
}
