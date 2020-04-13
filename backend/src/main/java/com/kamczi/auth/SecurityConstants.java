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
public class SecurityConstants {
    public static final String SECRET = "D0D1012D23EEB5809617D0F7D3E3C011681CBBE621F3A220714F400FAB9B7CC1";
    public static final long EXPIRATION_TIME = 86400000; 
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/public/users/sign-up/**";
}
