package com.infosys.lostFoundApplication.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "found_item")
public class FoundItem {

    @Id
    @Column(name = "found_item_id")
    @JsonProperty("foundItemId")
    private String foundItemId;

    @Column(name = "found_item_name")
    @JsonProperty("foundItemName")
    private String foundItemName;

    private String color;
    private String brand;
    private String category;
    private String location;
    private String username;

    @Column(name = "found_date")
    private LocalDate foundDate;

    // false = Not Returned | true = Returned
    @Column(name = "returned_status")
    private Boolean returnedStatus = false;

    // No-arg constructor (MANDATORY for JPA)
    public FoundItem() {}

    // Getters & Setters
    public String getFoundItemId() {
        return foundItemId;
    }

    public void setFoundItemId(String foundItemId) {
        this.foundItemId = foundItemId;
    }

    public String getFoundItemName() {
        return foundItemName;
    }

    public void setFoundItemName(String foundItemName) {
        this.foundItemName = foundItemName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getFoundDate() {
        return foundDate;
    }

    public void setFoundDate(LocalDate foundDate) {
        this.foundDate = foundDate;
    }

    public Boolean getReturnedStatus() {
        return returnedStatus;
    }

    public void setReturnedStatus(Boolean returnedStatus) {
        this.returnedStatus = returnedStatus;
    }
}
