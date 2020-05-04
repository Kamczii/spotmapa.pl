/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.controllers;

import com.kamczi.colletctions.PageWrapper;
import com.kamczi.entities.User;
import com.kamczi.exceptions.UserNotFoundException;
import com.kamczi.models.PasswordModel;
import com.kamczi.models.UserModel;
import com.kamczi.repository.UserRepository;
import com.kamczi.responses.GenericResponse;
import com.kamczi.services.UserService;
import java.util.Locale;
import java.util.UUID;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kamil
 */
@RestController
public class UserController {
    
    @Autowired
    UserService userService;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    JavaMailSender mailSender;
    
     @Autowired
    private MessageSource messages;
     
    @PostMapping("/public/users/sign-up")
    public User signUp(@RequestBody User user){
        return userService.signUp(user);
    }
    
    @PostMapping("/public/users/sign-up/facebook")
    public User signUpFacebook(@RequestBody String token){
        return userService.signUpFacebook(token);
    }
    
    @GetMapping("/public/users")
    public @ResponseBody PageWrapper<UserModel> getListOfUsers(@RequestParam(value = "page", required=false) Integer page, 
                                                        @RequestParam(value = "size", required=false) Integer size, 
                                                        @RequestParam(value = "sortBy", required=false) String sortBy,
                                                        @RequestParam(value = "how", required=false) String how){
        Pageable pageable;
        Sort sort;
        if(page == null)
            page=0;
        if(size == null)
            size=Integer.MAX_VALUE;
        
        if(sortBy != null){
            sort = Sort.by(sortBy);
            if(how == "ASC")
                sort.ascending();
            if(how == "DESC")
                sort.descending();
             pageable = PageRequest.of(page, size, sort);
        }else
             pageable = PageRequest.of(page, size);
        
       return userService.getListsOfUsers(pageable);
    }
             
    @GetMapping("/current-user")
    public @ResponseBody UserModel getCurrentUser(){
       return new UserModel(userService.getCurrentUser());
    }
    
    @GetMapping("/public/user")
    public UserModel getUserById(@RequestParam Long id){
        return new UserModel(userRepository.findById(id).get());
    }
    
    @PutMapping("/private/user/update")
    public @ResponseBody UserModel updateUser(@RequestBody UserModel model){
        User user = userService.updateUser(model);
        return new UserModel(userRepository.save(user));
    }
    
    
    @DeleteMapping("/private/user/{id}")
    public void deleteUser(@PathVariable long id){
        User user = userRepository.findById(id).orElseThrow(() ->  new UserNotFoundException(id));
        userRepository.delete(user);
    }
    
    @GetMapping("/public/user/nickname")
    public boolean isNicknameAlreadyExists(@RequestParam("nickname") String nickname){
        return userService.isNicknameAlreadyExists(nickname);
    }
    
    @GetMapping("/public/user/email")
    public boolean isEmailAlreadyExists(@RequestParam("email") String email){
        return userService.isEmailAlreadyExists(email);
    }
    
    @PostMapping("/public/user/resetPassword")
    public GenericResponse resetPassword(HttpServletRequest request, @RequestParam("email") String userEmail) throws MessagingException{
    User user = userService.findUserByEmail(userEmail);
    if (user == null) {
        String error = messages.getMessage("message.emailNotExist", null, request.getLocale());
        return new GenericResponse("", error);
    }
    String token = UUID.randomUUID().toString();
    userService.createPasswordResetTokenForUser(user, token);
    mailSender.send(userService.constructResetTokenEmail(getAppUrl(request), request.getLocale(), token, user));
    
        return new GenericResponse(
      messages.getMessage("message.resetPasswordEmail", null, 
      request.getLocale()));
    
    }
    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
    
    @PostMapping("/user/savePassword")
    public GenericResponse savePassword(Locale locale, 
      PasswordModel passwordDto) {
        User user = 
          (User) SecurityContextHolder.getContext()
                                      .getAuthentication().getPrincipal();

        userService.changeUserPassword(user, passwordDto.getNewPassword());
        return new GenericResponse(
          messages.getMessage("message.resetPasswordSuc", null, locale));
    }
    
    @PostMapping("/user/changePassword")
    public GenericResponse changePassword(Locale locale, Model model, 
      @RequestParam("id") long id, @RequestParam("token") String token,@RequestBody PasswordModel password){
        String result = userService.validatePasswordResetToken(id, token);
        if (result != null) {
            GenericResponse response = new GenericResponse(messages.getMessage("auth.message." + result, null, locale));
            return response;
        }
        User user = 
          (User) SecurityContextHolder.getContext()
                                      .getAuthentication().getPrincipal();
        
        userService.changeUserPassword(user,password.getNewPassword());
        return new GenericResponse(
          messages.getMessage("message.resetPasswordSuc", null, locale));
    }
}
