package com.infosys.lostFoundApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.infosys.lostFoundApplication.bean.*;
import com.infosys.lostFoundApplication.dao.MatchItemDao;
import com.infosys.lostFoundApplication.service.MatchItemService;

@RestController
@RequestMapping("/lostfound")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class MatchItemController {

    @Autowired
    private MatchItemService service;

    @Autowired
    private MatchItemDao dao;

    @PostMapping("/match")
    public void collectItem(@RequestBody MatchItemDTO dto) {
        service.collectItem(dto);
        dao.saveMatchItem(new MatchItem(dto));
    }
}
