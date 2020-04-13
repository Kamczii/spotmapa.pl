/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.repository;

import com.kamczi.entities.Avatar;
import com.kamczi.entities.Image;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Kamil
 */
public interface ImageRepository extends CrudRepository<Image, String>{
    
}
