package com.infosys.lostFoundApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.bean.*;
import com.infosys.lostFoundApplication.dao.*;

@Service
public class MatchItemService {

    @Autowired
    private LostItemDao lostItemDao;

    @Autowired
    private FoundItemDao foundItemDao;

    public void collectItem(MatchItemDTO dto) {

        LostItem lostItem = lostItemDao.getLostItemById(dto.getLostItemId());
        FoundItem foundItem = foundItemDao.getFoundItemById(dto.getFoundItemId());

        // Update status
        lostItem.setStatus(true);
        foundItem.setReturnedStatus(true);

        lostItemDao.saveLostItem(lostItem);
        foundItemDao.saveFoundItem(foundItem);
    }
}
