package com.infosys.lostFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.dao.LostItemDao;
import com.infosys.lostFoundApplication.service.LostItemService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class LostItemController {

    @Autowired
    private LostItemDao lostItemDao;

    @Autowired
    private LostItemService lostService;

    @PostMapping("/lost")
    public void saveLostItem(@RequestBody LostItem lostItem,
                             HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session != null) {
            String username = (String) session.getAttribute("username");
            lostItem.setUsername(username);
        }

        lostItemDao.saveLostItem(lostItem);
    }

    // ✅ STUDENT / ADMIN DECISION HERE
    @GetMapping("/lost")
    public List<LostItem> getLostItems(HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session == null) return List.of();

        String username = (String) session.getAttribute("username");
        String role = (String) session.getAttribute("role");

        // ADMIN → see all
        if (role != null && role.equalsIgnoreCase("ADMIN")) {
            return lostItemDao.getAllLostItems();
        }

        // STUDENT → see only own items
        return lostItemDao.getLostItemByUsername(username);
    }

    @GetMapping("/lost/{id}")
    public LostItem getLostItemById(@PathVariable String id) {
        return lostItemDao.getLostItemById(id);
    }

    @DeleteMapping("/lost/{id}")
    public void deleteLostItemById(@PathVariable String id) {
        lostItemDao.deleteLostItemById(id);
    }

    @PutMapping("/lost")
    public void updateLostItem(@RequestBody LostItem lostItem) {
        lostItemDao.saveLostItem(lostItem);
    }

    @GetMapping("/lost-id")
    public String generateId() {
        return lostService.generateLostItemId();
    }
}
