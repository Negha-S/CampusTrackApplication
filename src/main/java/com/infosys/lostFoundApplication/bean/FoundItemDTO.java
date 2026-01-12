package com.infosys.lostFoundApplication.bean;

import java.time.LocalDate;

public class FoundItemDTO implements Comparable<FoundItemDTO> {

    private String foundItemId;
    private String foundItemName;
    private String color;
    private String brand;
    private String category;
    private String location;
    private String username;
    private String foundDate;      // yyyy-MM-dd (String for frontend)
    private Boolean status;
    private Boolean returnedStatus;

    // ✅ Default Constructor
    public FoundItemDTO() {
        super();
    }

    // ✅ Full Constructor (used when manually creating DTO)
    public FoundItemDTO(String foundItemId, String foundItemName, String color, String brand,
                        String category, String location, String username,
                        String foundDate, Boolean status, Boolean returnedStatus) {
        this.foundItemId = foundItemId;
        this.foundItemName = foundItemName;
        this.color = color;
        this.brand = brand;
        this.category = category;
        this.location = location;
        this.username = username;
        this.foundDate = foundDate;
        this.status = status;
        this.returnedStatus = returnedStatus;
    }

    // ✅ Entity → DTO Constructor (FIXED)
    public FoundItemDTO(FoundItem foundItem) {
        this.foundItemId = foundItem.getFoundItemId();
        this.foundItemName = foundItem.getFoundItemName();
        this.color = foundItem.getColor();
        this.brand = foundItem.getBrand();
        this.category = foundItem.getCategory();
        this.location = foundItem.getLocation();
        this.username = foundItem.getUsername();

        // 🔥 FIX: LocalDate → String
        LocalDate date = foundItem.getFoundDate();
        if (date != null) {
            this.foundDate = date.toString(); // yyyy-MM-dd
        }

        this.status = foundItem.getStatus();
        this.returnedStatus = foundItem.getReturnedStatus();
    }

    // ================= Getters & Setters =================

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

    public String getFoundDate() {
        return foundDate;
    }

    public void setFoundDate(String foundDate) {
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

    // ================= Comparable =================
    @Override
    public int compareTo(FoundItemDTO other) {
        return this.foundItemId.compareTo(other.foundItemId);
    }
}
