package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.infosys.lostFoundApplication.bean.FoundItem;

@Repository
public interface FoundItemRepository extends JpaRepository<FoundItem, String> {

    // ✅ Get last FoundItem ID
    @Query("SELECT MAX(f.foundItemId) FROM FoundItem f")
    String getLastId();

    // ✅ Get FoundItems by username
    @Query("SELECT f FROM FoundItem f WHERE f.username = :username")
    List<FoundItem> getFoundItemsByUsername(@Param("username") String username);

    // ✅ Keyword search (JPQL, case-insensitive, FIXED FIELD NAME)
    @Query("""
        SELECT f FROM FoundItem f
        WHERE f.returnedStatus = false AND (
            LOWER(f.foundItemName) LIKE LOWER(CONCAT('%', :keyword, '%'))
         OR LOWER(f.color) LIKE LOWER(CONCAT('%', :keyword, '%'))
         OR LOWER(f.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))
         OR LOWER(f.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
         OR LOWER(f.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
        """)
    List<FoundItem> searchByKeyword(@Param("keyword") String keyword);

    // ✅ Fuzzy search using SOUNDEX (Native Query, FIXED COLUMN NAME)
    @Query(value = """
        SELECT * FROM found_item
        WHERE returned_status = false AND (
            SOUNDEX(found_item_name) = SOUNDEX(:keyword)
         OR SOUNDEX(color) = SOUNDEX(:keyword)
         OR SOUNDEX(brand) = SOUNDEX(:keyword)
         OR SOUNDEX(location) = SOUNDEX(:keyword)
         OR SOUNDEX(category) = SOUNDEX(:keyword)
        )
        """,
        nativeQuery = true)
    List<FoundItem> fuzzySearchBySoundex(@Param("keyword") String keyword);
}
