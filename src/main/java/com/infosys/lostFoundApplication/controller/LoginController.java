package com.infosys.lostFoundApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.infosys.lostFoundApplication.bean.LostFoundUser;
import com.infosys.lostFoundApplication.config.EncoderConfig;
import com.infosys.lostFoundApplication.service.LostFoundService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lostfound/auth")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class LoginController {

    @Autowired
    private LostFoundService service;

    @Autowired
    private EncoderConfig encoderConfig;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public void registerNewUser(@RequestBody LostFoundUser user) {
        PasswordEncoder encoder = encoderConfig.passwordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        service.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData,
                        HttpServletRequest request,
                        HttpServletResponse response) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(username, password));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            HttpSession session = request.getSession(true);

            String role = service.getRole(username);

            session.setAttribute("username", username);
            session.setAttribute("role", role);

            Cookie cookie = new Cookie("JSESSIONID", session.getId());
            cookie.setPath("/");
            cookie.setHttpOnly(false);
            cookie.setSecure(false);
            cookie.setMaxAge(3600);
            cookie.setAttribute("SameSite", "Lax");
            response.addCookie(cookie);

            return role;

        } catch (Exception ex) {
            return "false";
        }
    }


    @GetMapping("/user")
    public LostFoundUser getUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            String username = (String) session.getAttribute("username");
            return service.getUser(username);
        }
        return null;
    }

    @GetMapping("/role")
    public String getRole(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            Object role = session.getAttribute("role");
            if (role != null) return role.toString();
        }
        return "";
    }
    
    @GetMapping("/student")
    public List<LostFoundUser> getAllStudents() {
        return service.getAllStudents();
    }
    
    @DeleteMapping("/student/{username}")
    public void deleteStudent(@PathVariable String username) {
        service.deleteStudent(username);
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {

        SecurityContextHolder.clearContext();
        HttpSession session = request.getSession(false);

        if (session != null) session.invalidate();

        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setAttribute("SameSite", "Lax");

        response.addCookie(cookie);

        return ResponseEntity.ok("Logout successful");
    }
}
