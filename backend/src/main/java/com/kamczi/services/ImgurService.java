/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.services;

import com.kamczi.entities.Avatar;
import com.kamczi.entities.Image;
import com.kamczi.entities.Spot;
import com.kamczi.entities.User;
import com.kamczi.imgur.BasicImgurResponse;
import com.kamczi.imgur.DeleteBasicImgurResponse;
import com.kamczi.models.ImageModel;
import com.kamczi.repository.AvatarRepository;
import com.kamczi.repository.ImageRepository;
import com.kamczi.repository.SpotRepository;
import com.kamczi.repository.UserRepository;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
/**
 *
 * @author Kamil
 */

@Service
public class ImgurService {
    final String IMGUR_API = "https://api.imgur.com/3";
    final String CLIENT_ID = "ebbecd6fe09c8bb";
    final String CLIENT_SECRET = "99958f92442bc86992e56ee847e83380a84aed63";
    
    @Autowired
    RestTemplate restTemplate;
    
    @Autowired
    UserService userService;
    
    @Autowired
    SpotRepository spotRepo;
    
    @Autowired
    ImageRepository imageRepository;
    
    @Autowired
    AvatarRepository avatarRepository;
    
    @Autowired
    UserRepository userRepository;
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
    
    public BasicImgurResponse uploadProfilePicture(MultipartFile file) throws IOException{
        byte[] image = file.getBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Client-ID "+CLIENT_ID);
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(image, headers);
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(IMGUR_API+"/image");
        ResponseEntity<BasicImgurResponse> response = restTemplate.exchange(builder.toUriString(), HttpMethod.POST, requestEntity, BasicImgurResponse.class);
        if(response.getBody().getSuccess()){
            deleteProfilePictureIfExistFromDB();
            addProfilePictureToDB(response.getBody().getData());
        }
        return response.getBody();
    }
    
    public DeleteBasicImgurResponse deleteProfilePicture() throws IOException{
        User user = userService.getCurrentUser();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Client-ID "+CLIENT_ID);
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(null, headers);
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(IMGUR_API+"/image/"+user.getAvatar().getDeletehash());
        ResponseEntity<DeleteBasicImgurResponse> response = restTemplate.exchange(builder.toUriString(), HttpMethod.DELETE, requestEntity, DeleteBasicImgurResponse.class);
        if(response.getBody().getSuccess())
            deleteProfilePictureIfExistFromDB();
        return response.getBody();
    }
    
    private void addProfilePictureToDB(ImageModel model){
        User user = userService.getCurrentUser();
        Avatar entity = new Avatar();
        entity.setDeletehash(model.getDeletehash());
        entity.setImgur_id(model.getId());
        entity.setLink(model.getLink());
        user.setAvatar(entity);
        userRepository.save(user);
    }
    
    private void deleteProfilePictureIfExistFromDB(){
        User user = userService.getCurrentUser();
        Avatar avatar = user.getAvatar();
       
        if(avatar != null){
            avatarRepository.delete(avatar);
            user.setAvatar(null);
            userRepository.save(user);
        }
    }
    
    public List<BasicImgurResponse> addImagesToSpot(List<MultipartFile> files, Long id) throws IOException{
        List<BasicImgurResponse> responses = new ArrayList<>();
        
        for(MultipartFile file : files){
            byte[] image = file.getBytes();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Client-ID "+CLIENT_ID);
            HttpEntity<byte[]> requestEntity = new HttpEntity<>(image, headers);
            RestTemplate restTemplate = new RestTemplate();
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(IMGUR_API+"/image");
            ResponseEntity<BasicImgurResponse> response = restTemplate.exchange(builder.toUriString(), HttpMethod.POST, requestEntity, BasicImgurResponse.class);
            if(response.getBody().getSuccess()){
                addImageToSpot(response.getBody().getData(), id);
            }
            responses.add(response.getBody());
        }
        return responses;
    }
    
    public void deleteImagesFromSpot(List<String> deleteHashes){
        
    }
    private void addImageToSpot(ImageModel model, Long spot_id){
        Spot spot = spotRepo.findById(spot_id).get();
        User user = userService.getCurrentUser();
        Image entity = new Image();
        entity.setDeletehash(model.getDeletehash());
        entity.setImgur_id(model.getId());
        entity.setLink(model.getLink());
        entity.setUser(user);
        entity.setSpot(spot);
        imageRepository.save(entity);
    }
}
