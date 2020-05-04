/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.responses;

/**
 *
 * @author Kamil
 */
public class GenericResponse {
    private String message;
    private String error;
  
    public GenericResponse(String message) {
        super();
        this.message = message;
    }
  
    public GenericResponse(String message, String error) {
        super();
        this.message = message;
        this.error = error;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
    
    
}
