/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.imgur;

import com.kamczi.entities.Avatar;
import com.kamczi.models.ImageModel;

/**
 *
 * @author Kamil
 */
public class BasicImgurResponse {
    
    ImageModel data;
    Integer status;
    Boolean success;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public ImageModel getData() {
        return data;
    }

    public void setData(ImageModel data) {
        this.data = data;
    }
}
