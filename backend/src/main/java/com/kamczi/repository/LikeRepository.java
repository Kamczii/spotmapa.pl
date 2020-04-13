/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.repository;

import com.kamczi.entities.Spot;
import com.kamczi.entities.SpotLikes;
import com.kamczi.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Kamil
 */
public interface LikeRepository extends CrudRepository<SpotLikes, Long> {
    void deleteBySpot(Spot spot);
    SpotLikes findBySpotAndUser(Spot spot, User user);
    long deleteBySpotAndUser(Spot spot, User user);
}
