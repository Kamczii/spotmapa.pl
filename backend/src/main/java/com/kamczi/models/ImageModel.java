/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.models;

import com.kamczi.entities.Image;
import com.kamczi.entities.Person;

/**
 *
 * @author Kamil
 */
public class ImageModel {
        String id;
        String deletehash;
        String link;
        
        public ImageModel() {
        }
        
        public ImageModel(Image image){
            this.id = image.getImgurId();
            this.deletehash = image.getDeletehash();
            this.link = image.getLink();
        }
        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
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
}
