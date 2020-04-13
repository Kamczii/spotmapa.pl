/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.exceptions;

/**
 *
 * @author Kamil
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id) {
        super("Could not find user with id: "+id);
    }
    
    public UserNotFoundException(String id) {
        super("Could not find user with auth0_id: "+id);
    }
    
}
