package com.infosys.lostFoundApplication.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "lost_item")
public class LostItem {

    @Id
    @Column(name = "lost_item_id")
    @JsonProperty("lostItemId")
    private String lostItemId;

    @Column(name = "lost_item_name")
    @JsonProperty("lostItemName")
    private String lostItemName;

    private String color;
    private String brand;
    private String category;
    private String location;

    private String username;

    @Column(name = "lost_date")
    @JsonProperty("lostDate")
    private String lostDate;

    // false = Not Found | true = Found
    private Boolean status = false;

    public LostItem() {}

    // Getters & Setters
    public String getLostItemId() { return lostItemId; }
    public void setLostItemId(String lostItemId) { this.lostItemId = lostItemId; }

    public String getLostItemName() { return lostItemName; }
    public void setLostItemName(String lostItemName) { this.lostItemName = lostItemName; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getLostDate() { return lostDate; }
    public void setLostDate(String lostDate) { this.lostDate = lostDate; }

    public Boolean getStatus() { return status; }
    public void setStatus(Boolean status) { this.status = status; }
}
