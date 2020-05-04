/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.controllers;

import com.kamczi.colletctions.PageWrapper;
import com.kamczi.entities.Comment;
import com.kamczi.entities.Spot;
import com.kamczi.enums.SpotType;
import com.kamczi.models.CommentModel;
import com.kamczi.models.SpotModel;
import com.kamczi.services.CriteriaService;
import com.kamczi.services.SpotService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Kamil
 */
@CrossOrigin
@RestController
public class SpotController {
    @Autowired
    private SpotService spotService;
    
    @Autowired 
    private CriteriaService criteriaService;
    
    @GetMapping("/public/spot/all")
    public @ResponseBody PageWrapper<SpotModel> getAllPosts(@RequestParam(value = "criteria", required=false) String criteria){
       return spotService.getListOfPosts(criteriaService.criteriaToPageable(criteria));
    }
    
    @GetMapping("/public/type/{type}/spots")
    public PageWrapper<SpotModel> getPostsBySpotType(@PathVariable SpotType type, 
                                                        @RequestParam(value = "criteria", required=false) String criteria){
        return spotService.getPostsBySpotType(type, criteriaService.criteriaToPageable(criteria));
    }
    
    @GetMapping("/public/user/{id}/spots")
    public PageWrapper<SpotModel> getPostsByUserId(@PathVariable Long id, 
                                                        @RequestParam(value = "criteria", required=false) String criteria){
        return spotService.getPostsByUserId(id, criteriaService.criteriaToPageable(criteria));
    }
    
    @PostMapping("/private/spot/create")
    public Spot createPost(@RequestBody SpotModel spot) {
        return spotService.addPost(spot);
    }
    
    @GetMapping("/public/spot/{id}")
    public @ResponseBody SpotModel getById(@PathVariable("id") Long id) {
        return spotService.getPostById(id);
    } 
    
    @PutMapping("/private/spot/{id}")
    public Spot updatePost(@RequestBody SpotModel changes, @PathVariable Long id){
        return spotService.updatePost(changes, id);
    }
    
    @DeleteMapping("/private/spot/{id}")
    public void deletePostById(@PathVariable("id") Long id){
        spotService.deletePost(id);
    }
    
    @GetMapping("/public/spot/{id}/comments")
    public List<CommentModel> getPostComments(@PathVariable Long id){
        return spotService.getCommentsByPostId(id);
    }
    
    @PostMapping("/private/spot/{id}/comments")
    public Comment createComment(@PathVariable("id") Long id,@RequestBody CommentModel comment ){
        return spotService.addComment(comment, id);
    }
    
    @DeleteMapping("/private/comment/{id}")
    public void deleteCommentById(@PathVariable("id") Long id){
        spotService.deleteCommentById(id);
    }
    
    @GetMapping("/private/spot/{id}/like")
    public boolean isPostAlreadyLiked(@PathVariable Long id){
        return spotService.isPostAlreadyLiked(id);
    }
    
    @PostMapping("/private/spot/{id}/like")
    public boolean likePostById(@PathVariable Long id){
         return spotService.likePostById(id);
    }
    
    @DeleteMapping("/private/spot/{id}/like")
    public boolean unlikePostById(@PathVariable Long id){
         return spotService.unlikePostById(id);
    }
    
    @GetMapping("/public/sections")
    public SpotType[] getAvailableSections(){
        return spotService.getAvailableSpotTypes();
    }
    
    @GetMapping("/public/spot/{id}/likes")
    public Integer getLikesCount(@PathVariable Long id){
        return spotService.getLikesSize(id);
    }
}
