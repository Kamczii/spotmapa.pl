/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.services;

import com.kamczi.colletctions.PageWrapper;
import com.kamczi.entities.Comment;
import com.kamczi.entities.Image;
import com.kamczi.entities.Spot;
import com.kamczi.entities.SpotLikes;
import com.kamczi.entities.User;
import com.kamczi.enums.SpotType;
import com.kamczi.exceptions.SpotNotFoundException;
import com.kamczi.models.CommentModel;
import com.kamczi.models.SpotModel;
import com.kamczi.repository.CommentRepository;
import com.kamczi.repository.LikeRepository;
import com.kamczi.repository.SpotRepository;
import com.kamczi.repository.UserRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kamil
 */

@Service
public class SpotService {
    
    @Autowired
    private SpotRepository spotRepo;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private CommentRepository commentRepo;
    
    @Autowired
    private LikeRepository likeRepo;
    
    @Autowired
    private UserRepository userRepo;
    
    public PageWrapper<SpotModel> getListOfPosts(Pageable pageable){
        Page<Spot> posts =  spotRepo.findAll(pageable);
        List<SpotModel> postModels = new ArrayList<>();
        for(Spot post: posts){
            postModels.add(new SpotModel(post));
        }
        
        PageWrapper<SpotModel> page = new PageWrapper<>();
        page.setResults(postModels);
        page.setRows(spotRepo.findAll().size());
        
        return page;
    }
    public Spot updatePost(SpotModel model, Long id){
        SpotType spotType = model.getSpotType();
        Spot post = spotRepo.findById(id).get();
        post.setDescription(model.getDescription());
        post.setEditedAt(new Date());
        post.setSpotType(spotType);
        post.setName(model.getName());
        post.setLng(model.getLng());
        post.setLat(model.getLat());
        post.setSecurity(model.getSecurity());
        return spotRepo.save(post);
    }
    
    public SpotModel getPostById(Long id){
        Spot post = spotRepo.findById(id).get();
        if(post!=null){
            spotRepo.save(post);
            return new SpotModel(post);
        }
        else 
            throw new SpotNotFoundException(id);
    }
    
    public Comment addComment(CommentModel comment, Long post_id){
        Spot post = spotRepo.findById(post_id).get();
        User user = userService.getCurrentUser();
        Comment entity = new Comment();
        entity.setAuthor(user);
        entity.setSpot(post);
        entity.setComment(comment.getComment());
        entity.setDate(new Date());
        return commentRepo.save(entity);
    }
    
    public Comment editComment(CommentModel comment, Long id){
        Comment entity = commentRepo.findById(id).get();
        entity.setComment(comment.getComment());
        entity.setEdited_at(new Date());
        return commentRepo.save(entity);
    }
    
    
    public Spot addPost(SpotModel model){
        User user = userService.getCurrentUser();
        SpotType spotType = model.getSpotType();
        Spot post = new Spot();
        post.setDescription(model.getDescription());
        post.setEditedAt(new Date());
        post.setSpotType(spotType);
        post.setName(model.getName());
        post.setCreatedAt(new Date());
        post.setAuthor(user);
        post.setSecurity(model.getSecurity());
        post.setLat(model.getLat());
        post.setLng(model.getLng());
        return spotRepo.save(post);
    }
    
    @Transactional
    public void deletePost(Long id){
        Spot spot = spotRepo.findById(id).get();
        if(spot!=null){
            commentRepo.deleteBySpot(spot);
            likeRepo.deleteBySpot(spot);
            spotRepo.delete(spot);
        }else
            throw new SpotNotFoundException(id);
    }
    
    public PageWrapper<SpotModel> getPostsBySpotType(SpotType type, Pageable pageable) {
        List<Spot> spots = spotRepo.findBySpotType(type, pageable);
        List<SpotModel> models = new ArrayList<>();
        
        for(Spot spot: spots){
            models.add(new SpotModel(spot));
        }
        
        PageWrapper<SpotModel>  page = new PageWrapper();
        page.setResults(models);
        page.setRows(spotRepo.findBySpotType(type).size());
        
        return page;
    }
    
    public PageWrapper<SpotModel> getPostsByUserId(Long id, Pageable pageable) {
        User user = userRepo.findById(id).get();
        List<Spot> posts = spotRepo.findByAuthor(user, pageable);
        List<SpotModel> models = new ArrayList<>();
        
        for(Spot post: posts){
            models.add(new SpotModel(post));
        }
        
        PageWrapper<SpotModel>  page = new PageWrapper();
        page.setResults(models);
        page.setRows(spotRepo.findByAuthor(user).size());
        
        return page;
    }
    
    public List<CommentModel> getCommentsByPostId(Long id){
        Spot post = spotRepo.findById(id).orElseThrow(() -> new SpotNotFoundException(id));
        List<Comment> comments = post.getComments();
        List<CommentModel> commentModels = new ArrayList<>();
        
        for(Comment comment: comments){
            commentModels.add(new CommentModel(comment));
        }
        
        return commentModels;
    }
    
    public boolean isPostAlreadyLiked(Long id){
        User user = userService.getCurrentUser();
        Spot post = spotRepo.findById(id).get();
        SpotLikes like = likeRepo.findBySpotAndUser(post, user);
        
        if(like != null)
            return true;
        else
            return false;
    }
    
    
    public boolean likePostById(Long id){
        SpotLikes like = new SpotLikes();
        if(likeRepo.findBySpotAndUser(spotRepo.findById(id).get(), userService.getCurrentUser()) == null){
            like.setSpot(spotRepo.findById(id).get());
            like.setUser(userService.getCurrentUser());
            SpotLikes liked =  likeRepo.save(like);
            if(liked != null)
                return true;
        }
        return false;
    }
    
    @Transactional
    public boolean unlikePostById(Long id){
        if(likeRepo.deleteBySpotAndUser(spotRepo.findById(id).get(), userService.getCurrentUser()) == 1)
                    return true;
                else 
                    return false;
    }
    
    public Integer getCommentsSizeOfPostId(Long id){
        return spotRepo.findById(id).get().getComments().size();
    }
    
    public Integer getSpotsSizeByType(SpotType type){
        return spotRepo.findBySpotType(type).size();
    }
    
    public SpotType[] getAvailableSpotTypes(){
        return SpotType.values();
    }
    
    public Integer getLikesSize(Long id){
         return spotRepo.findById(id).get().getLikes().size();
    }
    
    public boolean checkIfUserOwnsTheImage(Image image){
        if(userService.getCurrentUser().getUser_id()==image.getUser().getUser_id())
            return true;
        else 
            return false;
    }
    
    public boolean checkIfUserOwnsThePost(Long postId){
        if(userService.getCurrentUser().getUser_id()==getPostById(postId).getUser().getUser_id())
            return true;
        else 
            return false;
    }
}
