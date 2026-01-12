package com.infosys.lostFoundApplication.bean;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "match_item")
public class MatchItem {

    @EmbeddedId
    private MatchItemId matchItemId;

    private String itemName;
    private String category;
    private String lostUsername;
    private String foundUsername;

    // Mandatory no-arg constructor
    public MatchItem() {
        super();
    }

    // Constructor using DTO
    public MatchItem(MatchItemDTO dto) {
        this.matchItemId = new MatchItemId(
                dto.getLostItemId(),
                dto.getFoundItemId()
        );
        this.itemName = dto.getItemName();
        this.category = dto.getCategory();
        this.lostUsername = dto.getLostUsername();
        this.foundUsername = dto.getFoundUsername();
    }

    public MatchItemId getMatchItemId() {
        return matchItemId;
    }

    public void setMatchItemId(MatchItemId matchItemId) {
        this.matchItemId = matchItemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLostUsername() {
        return lostUsername;
    }

    public void setLostUsername(String lostUsername) {
        this.lostUsername = lostUsername;
    }

    public String getFoundUsername() {
        return foundUsername;
    }

    public void setFoundUsername(String foundUsername) {
        this.foundUsername = foundUsername;
    }
}
