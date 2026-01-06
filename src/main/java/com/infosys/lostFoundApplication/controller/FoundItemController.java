package com.infosys.lostFoundApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.infosys.lostFoundApplication.bean.FoundItem;
import com.infosys.lostFoundApplication.bean.FoundItemDTO;
import com.infosys.lostFoundApplication.bean.LostItem;
import com.infosys.lostFoundApplication.dao.FoundItemDao;
import com.infosys.lostFoundApplication.dao.LostItemDao;
import com.infosys.lostFoundApplication.service.FoundItemService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class FoundItemController {

    @Autowired
    private FoundItemDao dao;

    @Autowired
    private FoundItemService foundItemService;

    @Autowired
    private LostItemDao lostItemDao;

    // SAVE FOUND ITEM
    @PostMapping("/found")
    public void saveFoundItem(@RequestBody FoundItem foundItem,
                              HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session != null) {
            String username = (String) session.getAttribute("username");
            foundItem.setUsername(username);
        }

        dao.saveFoundItem(foundItem);
    }

    // ADMIN → ALL | STUDENT → OWN
    @GetMapping("/found")
    public List<FoundItem> getFoundItems(HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session == null) return List.of();

        String username = (String) session.getAttribute("username");
        String role = (String) session.getAttribute("role");

        if ("ADMIN".equalsIgnoreCase(role)) {
            return dao.getAllFoundItems();
        }

        return dao.getFoundItemByUsername(username);
    }

    // GET FOUND ITEM BY ID
    @GetMapping("/found/{id}")
    public FoundItem getFoundItemById(@PathVariable String id) {
        return dao.getFoundItemById(id);
    }

    // DELETE FOUND ITEM
    @DeleteMapping("/found/{id}")
    public void deleteFoundItemById(@PathVariable String id) {
        dao.deleteFoundItemById(id);
    }

    // UPDATE FOUND ITEM
    @PutMapping("/found")
    public void updateFoundItem(@RequestBody FoundItem foundItem) {
        dao.saveFoundItem(foundItem);
    }

    // GENERATE FOUND ITEM ID
    @GetMapping("/found-id")
    public String generateId() {
        return foundItemService.generateFoundItemId();
    }

    // ✅ GET MATCHED FOUND ITEMS USING LOST ITEM ID
    @GetMapping("/found-id/{id}")
    public List<FoundItemDTO> getFoundItemsByLostItem(@PathVariable String id) {
        LostItem lostItem = lostItemDao.getLostItemById(id);
        return foundItemService.collectFoundItems(lostItem);
    }
}
