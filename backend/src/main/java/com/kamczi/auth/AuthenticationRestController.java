/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.auth;
import static com.kamczi.auth.SecurityConstants.HEADER_STRING;
import com.kamczi.entities.User;
import com.kamczi.facebook.FacebookUserResponse;
import com.kamczi.repository.UserRepository;
import com.kamczi.services.UserService;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
/**
 *
 * @author Kamil
 */

@RestController
public class AuthenticationRestController {
    

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    
    @Autowired
    private JwtUserDetailsService userDetailsService;

    
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
        .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    
    }
    
    @PostMapping("/authenticate/facebook")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody String fb_token) throws Exception {
        
        String name = authenticateFacebook(fb_token);
        final UserDetails userDetails = userDetailsService
        .loadUserByUsername(name);
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    
    }
    
    @GetMapping("/refresh-token")
    public ResponseEntity<?> refreshAuthenticationToken(HttpServletRequest request) throws Exception {
        String authToken = request.getHeader(HEADER_STRING);
        final String token = authToken.substring(7);
        String newToken = jwtTokenUtil.refreshToken(token);
        return ResponseEntity.ok(new JwtResponse(newToken));
    }
    
    private void authenticate(String username, String password) throws Exception {
        try {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
        throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
        throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    
    private String authenticateFacebook(String token){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+ token);
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://graph.facebook.com"+"/me?fields=name");
        ResponseEntity<FacebookUserResponse> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, requestEntity, FacebookUserResponse.class);
        if(response.getStatusCode() == HttpStatus.OK){
            return response.getBody().getName();
        } else {
            return null;
        }
    }
}