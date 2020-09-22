/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.repository;

import com.kamczi.entities.Person;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 * @author Kamil
 */
public interface UserRepository extends PagingAndSortingRepository<Person, Long> {
    Person findByUsername(String username);
    Person findByEmail(String email);
    List<Person> findAll();
}
