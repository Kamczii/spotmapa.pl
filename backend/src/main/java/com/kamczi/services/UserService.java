/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.services;

import com.kamczi.colletctions.PageWrapper;
import com.kamczi.entities.Avatar;
import com.kamczi.entities.PasswordResetToken;
import com.kamczi.entities.User;
import com.kamczi.enums.AuthProvider;
import com.kamczi.exceptions.EmailAlreadyExistsException;
import com.kamczi.exceptions.EmptyEmailException;
import com.kamczi.exceptions.EmptyUsernameException;
import com.kamczi.exceptions.UserAlreadyExists;
import com.kamczi.facebook.FacebookUserResponse;
import com.kamczi.models.UserModel;
import com.kamczi.repository.PasswordResetTokenRepository;
import com.kamczi.repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @Autowired
    private PasswordResetTokenRepository passwordRepository;
    @Autowired
    private MessageSource messages;
    @Autowired
    private Environment env;
    @Autowired
    JavaMailSender mailSender;

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
    
    
    public void changeUserPassword(User user, String password) {
        String encoded = bCryptPasswordEncoder.encode(password);
        user.setPassword(encoded);
        userRepository.save(user);
    
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
    
    public User findUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail);
    }
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordRepository.save(myToken);
    }   
    
     public MimeMessage constructResetTokenEmail(final String contextPath, final Locale locale, final String token, final User user) throws MessagingException {
        final String url = "<p><a href=\""+env.getProperty("spring.frontend.url") + "?id=" + user.getUser_id() + "&token=" + token+"\"/>Kliknij tutaj, aby zresetować hasło</a><br>"+env.getProperty("spring.frontend.url") + "?id=" + user.getUser_id() + "&token=" + token+"</p>";
        final String message = "<h2>"+messages.getMessage("message.resetPassword", null, locale)+"</h2>";
        return constructEmail(messages.getMessage("message.resetPasswordEmailTitle", null, locale), message + " \r\n" + url, user);
    }

      private MimeMessage constructEmail(String subject, String body, User user) throws MessagingException {
          
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setSubject(subject);
        helper.setText(body,true);
        helper.setTo(user.getEmail());
        helper.setFrom(env.getProperty("spring.mail.username"));
        return mimeMessage;
    }

      public String validatePasswordResetToken(long id, String token) {
        PasswordResetToken passToken = 
          passwordRepository.findByToken(token);
        if ((passToken == null) || (passToken.getUser()
            .getUser_id() != id)) {
            return "invalidToken";
        }

        Calendar cal = Calendar.getInstance();
        if ((passToken.getExpiryDate()
            .getTime() - cal.getTime()
            .getTime()) <= 0) {
            return "expired";
        }
        
        passToken.setExpiryDate(new Date());
        passwordRepository.save(passToken);
        User user = passToken.getUser();
        Authentication auth = new UsernamePasswordAuthenticationToken(
          user, null, Arrays.asList(
          new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
        
        SecurityContextHolder.getContext().setAuthentication(auth);
        return null;
    }
      
}
