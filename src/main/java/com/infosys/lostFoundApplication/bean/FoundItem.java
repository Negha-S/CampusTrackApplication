package com.infosys.lostFoundApplication.bean;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class FoundItem {

    @Id
    @Column(name = "found_item_id")
    @JsonProperty("foundItemId")
    private String foundItemId;

    @Column(name = "found_item_name")
    @JsonProperty("foundItemName")
    private String foundItemName;

    @JsonProperty("color")
    private String color;

    @JsonProperty("brand")
    private String brand;

    @JsonProperty("category")
    private String category;

    @JsonProperty("location")
    private String location;

    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Column(name = "found_date")
    @JsonProperty("foundDate")
    private LocalDate foundDate;

    @Column(nullable = false)
    @JsonProperty("status")
    private Boolean status = false;

    @Column(name = "returned_status", nullable = false)
    @JsonProperty("returnedStatus")
    private Boolean returnedStatus = false;

    public FoundItem() {}

    public FoundItem(FoundItemDTO foundItem) {
        this.foundItemId = foundItem.getFoundItemId();
        this.foundItemName = foundItem.getFoundItemName();
        this.color = foundItem.getColor();
        this.brand = foundItem.getBrand();
        this.category = foundItem.getCategory();
        this.location = foundItem.getLocation();
        this.username = foundItem.getUsername();

        if (foundItem.getFoundDate() != null && !foundItem.getFoundDate().isEmpty()) {
            this.foundDate = LocalDate.parse(foundItem.getFoundDate());
        }

        this.status = foundItem.getStatus();
        this.returnedStatus = foundItem.getReturnedStatus();
    }

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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean getReturnedStatus() {
        return returnedStatus;
    }

    public void setReturnedStatus(Boolean returnedStatus) {
        this.returnedStatus = returnedStatus;
    }
}
