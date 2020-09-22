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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 *
 * @author Kamil
 */
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="spot_id")
    @JsonIgnore
    private Spot spot;
    
    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private Person user;
    
    @JsonIgnore
    private String imgurId;
    @JsonIgnore
    private String deletehash;
    private String link;

    public String getImgurId() {
        return imgurId;
    }

    public void setImgurId(String imgurId) {
        this.imgurId = imgurId;
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
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Spot getSpot() {
        return spot;
    }

    public void setSpot(Spot spot) {
        this.spot = spot;
    }

    public Person getUser() {
        return user;
    }

    public void setUser(Person user) {
        this.user = user;
    }
    
    
}
