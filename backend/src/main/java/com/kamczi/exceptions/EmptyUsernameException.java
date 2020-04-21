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
public class EmptyUsernameException extends RuntimeException {
    public EmptyUsernameException() {
        super("Username cannot be null");
    }
}
