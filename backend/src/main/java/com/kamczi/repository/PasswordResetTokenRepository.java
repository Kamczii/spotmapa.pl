/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.repository;

import com.kamczi.entities.PasswordResetToken;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Kamil
 */
public interface PasswordResetTokenRepository extends CrudRepository<PasswordResetToken, Long>{

    public PasswordResetToken findByToken(String token);
    
}
