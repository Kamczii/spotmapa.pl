/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.services;

import com.kamczi.colletctions.PageWrapper;
import com.kamczi.entities.Avatar;
import com.kamczi.entities.User;
import com.kamczi.enums.AuthProvider;
import com.kamczi.exceptions.EmailAlreadyExistsException;
import com.kamczi.exceptions.EmptyEmailException;
import com.kamczi.exceptions.EmptyUsernameException;
import com.kamczi.exceptions.UserAlreadyExists;
import com.kamczi.facebook.FacebookUserResponse;
import com.kamczi.imgur.BasicImgurResponse;
import com.kamczi.models.UserModel;
import com.kamczi.repository.UserRepository;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 *
 * @author Kamil
 */
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    public User signUp(User user){
        
        
        if(isNicknameAlreadyExists(user.getUsername()))
            throw new UserAlreadyExists(user.getUsername());
        if(isEmailAlreadyExists(user.getUsername()))
            throw new UserAlreadyExists(user.getUsername());
        
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setCreated_at(new Date());
        user.setProvider(AuthProvider.LOCAL);
        user.setAvatar(new Avatar());
        return userRepository.save(user);
    }
    
    public User signUpFacebook(String access_token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+ access_token);
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://graph.facebook.com"+"/me?fields=id,name,email,picture.type(large)");
        ResponseEntity<FacebookUserResponse> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, requestEntity, FacebookUserResponse.class);
        if(response.getStatusCode() == HttpStatus.OK){
            User user = new User();
            user.setEmail(response.getBody().getEmail());
            user.setUsername(response.getBody().getName());
            user.setCreated_at(new Date());
            user.setProvider(AuthProvider.FACEBOOK);
            Avatar avatar = new Avatar();
            avatar.setLink(response.getBody().getPicture().getData().getUrl());
            avatar.setUser(user);
            user.setAvatar(avatar);
            return userRepository.save(user); 
        }
        return null;
    }
    
    public PageWrapper<UserModel> getListsOfUsers(@PageableDefault(page = 0, size = Integer.MAX_VALUE) Pageable pageable){
        Page<User> users =  userRepository.findAll(pageable);
        List<UserModel> userModels = new ArrayList<>();
        for(User user: users){
            userModels.add(new UserModel(user));
        }
        
        PageWrapper<UserModel> page = new PageWrapper();
        page.setResults(userModels);
        page.setRows(userRepository.findAll().size());
        
        return page;
    }
    
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !"anonymousUser".equals(authentication.getName())) {
            return userRepository.findByUsername(authentication.getName());
        }
        return null;
    }
    
    public User updateUser(UserModel model){
        User user = getCurrentUser();
        
        if(!model.getUsername().equals(user.getUsername())){
            if(model.getUsername() != null){
                if(isNicknameAlreadyExists((model.getUsername())))
                    throw new UserAlreadyExists((model.getUsername()));
                else
                    user.setUsername(model.getUsername());
            }else
                throw new EmptyUsernameException();
        }
        
        System.out.println(model.getEmail() +" "+ user.getEmail());
        if(!model.getEmail().equals(user.getEmail())){
            if(model.getEmail() != null){
                if(isEmailAlreadyExists((model.getEmail())))
                    throw new EmailAlreadyExistsException((model.getEmail()));
                else
                    user.setEmail(model.getEmail());
            }else
                throw new EmptyEmailException();
        }
        
        user.setUpdated_at(new Date());
        user.setDescription(model.getDescription());
        return user;
    }
    
    @Transactional
    public User deleteCurrentUser(){
        User user = getCurrentUser();
        userRepository.delete(user);
        return user;
    }
    
    public boolean isNicknameAlreadyExists(String nickname){
        User user = userRepository.findByUsername(nickname);
        if(user == null)
            return false;
        else 
            return true;
    }
    
    public boolean isEmailAlreadyExists(String email){
        User user = userRepository.findByEmail(email);
        if(user == null)
            return false;
        else 
            return true;
    }
    
    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
