package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.infosys.lostFoundApplication.bean.FoundItem;

@Repository
public class FoundItemDaoImpl implements FoundItemDao {

    @Autowired
    private FoundItemRepository repository;

    @Override
    public void saveFoundItem(FoundItem foundItem) {
        repository.save(foundItem);
    }

    @Override
    public List<FoundItem> getAllFoundItems() {
        return repository.findAll();
    }

    @Override
    public FoundItem getFoundItemById(String foundItemId) {
        return repository.findById(foundItemId).orElse(null);
    }

    @Override
    public void deleteFoundItemById(String foundItemId) {
        repository.deleteById(foundItemId);
    }

    @Override
    public String getLastId() {
        return repository.getLastId();
    }

    // ✅ FIXED METHOD CALL
    @Override
    public List<FoundItem> getFoundItemByUsername(String username) {
        return repository.getFoundItemsByUsername(username);
    }
}
