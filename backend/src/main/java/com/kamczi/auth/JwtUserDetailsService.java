/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.auth;

import com.kamczi.enums.AuthProvider;
import com.kamczi.repository.UserRepository;
import static java.util.Collections.emptyList;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kamil
 */

@Service
class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.kamczi.entities.Person user;
        if(isValid(username)){
            user = userRepository.findByEmail(username);
        } else
            user = userRepository.findByUsername(username);
        
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        if(user.getProvider() == AuthProvider.LOCAL)
            return new User(user.getUsername(), user.getPassword(), emptyList());
        else
            return new User(user.getUsername(), "", emptyList());
    }
    
    public static boolean isValid(String email) 
    { 
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+ 
                            "[a-zA-Z0-9_+&*-]+)*@" + 
                            "(?:[a-zA-Z0-9-]+\\.)+[a-z" + 
                            "A-Z]{2,7}$"; 
                              
        Pattern pat = Pattern.compile(emailRegex); 
        if (email == null) 
            return false; 
        return pat.matcher(email).matches(); 
    } 
}
