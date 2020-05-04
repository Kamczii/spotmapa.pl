/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.controllers;

import com.kamczi.responses.BasicImgurResponse;
import com.kamczi.responses.DeleteBasicImgurResponse;
import com.kamczi.services.ImgurService;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Kamil
 */
@RestController
public class ImgurController {
    @Autowired
    private ImgurService service;
    
    @PostMapping(value = "/private/image/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BasicImgurResponse uploadProfilePicture(@RequestParam List<MultipartFile> file){
        try {
            return service.uploadProfilePicture(file.get(0));
        } catch (IOException ex) {
            Logger.getLogger(ImgurController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
    
    @DeleteMapping("/private/image/avatar")
    public DeleteBasicImgurResponse deleteProfilePicture(){
        try {
            return service.deleteProfilePicture();
        } catch (IOException ex) {
            Logger.getLogger(ImgurController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
    
    @PostMapping(value = "/private/spot/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<BasicImgurResponse> uploadImagesToSpot(@PathVariable Long id, @RequestParam List<MultipartFile> files){
        try {
            return service.addImagesToSpot(files,id);
        } catch (IOException ex) {
            Logger.getLogger(ImgurController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }
    
    @DeleteMapping("/private/spot/{id}/images/{imgurId}")
    public DeleteBasicImgurResponse deleteSpotImage(@PathVariable Long id, @PathVariable String imgurId){
        return service.deleteImagesFromSpot(id, imgurId);
    }
    
}
