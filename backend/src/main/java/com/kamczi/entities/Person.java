/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kamczi.enums.AuthProvider;
import com.kamczi.enums.Role;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Kamil
 */
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long user_id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    private String description;
    private Date created_at;
    private Date updated_at;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "avatar_id")
    private Avatar avatar;
    @Enumerated(EnumType.STRING)
    private Role role = Role.BASIC;
    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider = AuthProvider.LOCAL;
    
     @OneToMany(mappedBy="author")
    @JsonIgnore
    private List<Spot> spots = new ArrayList<Spot>();
     
    @OneToMany(mappedBy="user")
    @JsonIgnore
    private List<Image> images = new ArrayList<Image>();
      
    @OneToMany(mappedBy="author", orphanRemoval = true, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<Comment>();
    @OneToMany(mappedBy="user", orphanRemoval = true, cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<SpotLikes> likes;
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Avatar getAvatar() {
        return avatar;
    }

    public void setAvatar(Avatar avatar) {
        this.avatar = avatar;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }
    
    
    
    public Long getUser_id() {
        return user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
    
    public String getUsername() {
        return username;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public List<Spot> getSpots() {
        return spots;
    }

    public void setSpots(List<Spot> spots) {
        this.spots = spots;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<SpotLikes> getLikes() {
        return likes;
    }

    public void setLikes(List<SpotLikes> likes) {
        this.likes = likes;
    }
    
    
}
