/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.repository;

import com.kamczi.entities.Spot;
import com.kamczi.entities.Person;
import com.kamczi.enums.SpotType;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 * @author Kamil
 */
public interface SpotRepository extends PagingAndSortingRepository<Spot, Long> {
    List<Spot> findAll();
    List<Spot> findBySpotType(SpotType spotType, Pageable pageable);
    List<Spot> findBySpotType(SpotType spotType);

    List<Spot> findByAuthor(Person user, Pageable pageable);

    List<Spot> findByAuthor(Person user);
}
