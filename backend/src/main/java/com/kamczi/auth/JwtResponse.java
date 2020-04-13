/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.auth;

/**
 *
 * @author Kamil
 */
public class JwtResponse {

    
    private final String jwttoken;
    public JwtResponse(String jwttoken) {
    this.jwttoken = jwttoken;
    }
    public String getToken() {
    return this.jwttoken;
    }
    
}
