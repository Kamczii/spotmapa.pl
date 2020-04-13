/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kamczi.constants.CONSTANTS;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author Kamil
 */

@Entity
public class Avatar {
        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        @JsonIgnore
        private Long image_id;
        @JsonIgnore
        private String imgur_id;
        @JsonIgnore
        private String deletehash;
        private String link = CONSTANTS.DEFAULT_AVATAR_LINK;
        @OneToOne(mappedBy = "avatar")
        @JsonIgnore
        private User user;

    public Long getImage_id() {
        return image_id;
    }

    public void setImage_id(Long image_id) {
        this.image_id = image_id;
    }

    public String getImgur_id() {
        return imgur_id;
    }

    public void setImgur_id(String imgur_id) {
        this.imgur_id = imgur_id;
    }

    public String getDeletehash() {
        return deletehash;
    }

    public void setDeletehash(String deletehash) {
        this.deletehash = deletehash;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
}
