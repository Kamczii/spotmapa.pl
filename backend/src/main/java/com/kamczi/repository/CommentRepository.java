/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.repository;

import com.kamczi.entities.Comment;
import com.kamczi.entities.Spot;
import java.util.Set;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 *
 * @author Kamil
 */
public interface CommentRepository extends PagingAndSortingRepository<Comment, Long>{
    Set<Comment> deleteBySpot(Spot spot);
}
