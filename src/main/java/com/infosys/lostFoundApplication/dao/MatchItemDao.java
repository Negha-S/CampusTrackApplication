package com.infosys.lostFoundApplication.dao;

import java.util.List;
import com.infosys.lostFoundApplication.bean.MatchItem;

public interface MatchItemDao {
    void saveMatchItem(MatchItem matchItem);
    List<MatchItem> getAllMatchItems();
}
