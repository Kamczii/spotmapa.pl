/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kamczi.enums.SpotType;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 *
 * @author Kamil
 */
@Entity
public class Spot {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long spot_id;
    private SpotType spotType;
    private String name;
    private Date createdAt;
    private Date editedAt;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User author;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    @OneToMany(mappedBy="spot")
    @JsonIgnore
    private List<Comment> comments = new ArrayList<Comment>();
    
    @OneToMany(mappedBy="spot", orphanRemoval = true, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Set<SpotLikes> likes  = new TreeSet<SpotLikes>();
    
    @Column(precision = 11, scale = 8)
    private Double lng;
    @Column(precision = 10, scale = 8)
    private Double lat;
    
    @Min(0)
    @Max(5)
    private short security;
    
    @OneToMany(mappedBy="spot", orphanRemoval = true, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Image> images = new ArrayList<Image>();

    public Long getSpot_id() {
        return spot_id;
    }

    public void setSpot_id(Long spot_id) {
        this.spot_id = spot_id;
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getEditedAt() {
        return editedAt;
    }

    public void setEditedAt(Date editedAt) {
        this.editedAt = editedAt;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Set<SpotLikes> getLikes() {
        return likes;
    }

    public void setLikes(Set<SpotLikes> likes) {
        this.likes = likes;
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

    
    
    

    public short getSecurity() {
        return security;
    }

    public void setSecurity(short security) {
        this.security = security;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
    
    
    
}
