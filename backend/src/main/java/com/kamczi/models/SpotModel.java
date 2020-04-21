/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.models;

import com.kamczi.entities.Image;
import com.kamczi.entities.Spot;
import com.kamczi.entities.User;
import com.kamczi.enums.SpotType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Kamil
 */
public class SpotModel {
    
    private Long id;
    private User user;
    private SpotType spotType;
    private String name;
    private Date created_at;
    private Date updated_at;
    private String description;
    private Integer likes;
    private Integer comments;
    private Short security;
    private Double lng;
    private Double lat;
    List<MultipartFile> files;
    
    private List<ImageModel> images = new ArrayList();
    public SpotModel(){}
    
    public SpotModel(Spot spot){
           this.id = spot.getSpot_id();
           this.user = spot.getAuthor();
           this.spotType = spot.getSpotType();
           this.created_at = spot.getCreatedAt();
           this.description = spot.getDescription();
           this.likes = spot.getLikes().size();
           this.name = spot.getName();
           this.updated_at = spot.getEditedAt();
           this.comments = spot.getComments().size();
           this.security = spot.getSecurity();
           this.lng = spot.getLng();
           this.lat = spot.getLat();
           
            for (Image image : spot.getImages()) {
                this.images.add(new ImageModel(image));
            }
    }

    public List<MultipartFile> getFiles() {
        return files;
    }

    public void setFiles(List<MultipartFile> files) {
        this.files = files;
    }
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SpotType getSpotType() {
        return spotType;
    }

    public void setSpotType(SpotType spotType) {
        this.spotType = spotType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getComments() {
        return comments;
    }

    public void setComments(Integer comments) {
        this.comments = comments;
    }

    public Short getSecurity() {
        return security;
    }

    public void setSecurity(Short security) {
        this.security = security;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public List<ImageModel> getImages() {
        return images;
    }

    public void setImages(List<ImageModel> images) {
        this.images = images;
    }

    

    

    
    
    
}
