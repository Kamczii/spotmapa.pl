/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.models;

import com.kamczi.entities.User;
import java.util.Date;

/**
 *
 * @author Kamil
 */
public class UserModel {
    private Long id;
    private String email;
    private String username;
    private String description;
    private Date created_at;
    private Date updated_at;
    private String avatar_url;
    
    public UserModel(){}
    
    public UserModel(User user){
        this.id = user.getUser_id();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.description = user.getDescription();
        this.created_at = user.getCreated_at();
        this.updated_at = user.getUpdated_at();
        this.avatar_url = user.getAvatar().getLink();
    }

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }
    
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public Long getId() {
        return id;
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

    public void setId(Long id) {
        this.id = id;
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
    
    
    
    
}
