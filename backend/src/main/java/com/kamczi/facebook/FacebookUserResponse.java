/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.facebook;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;

/**
 *
 * @author Kamil
 */
public class FacebookUserResponse {
    String name;
    String email;
    FbPicture picture;
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public FbPicture getPicture() {
        return picture;
    }

    public void setPicture(FbPicture picture) {
        this.picture = picture;
    }
    
    
}

