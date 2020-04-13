/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kamczi.criteria.BaseSearchCriteria;
import com.kamczi.criteria.SearchOrder;
import com.kamczi.enums.SortOrder;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;



/**
 *
 * @author Kamil
 */
@Service
public class CriteriaService {
    public Pageable criteriaToPageable(String criteria){
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE);
        BaseSearchCriteria sc = new BaseSearchCriteria();
        
        
        try {
            if(criteria!=null && criteria != "{}"){
                sc = new ObjectMapper().readValue(criteria, BaseSearchCriteria.class);
            
                if(sc.getSortOrder() != null){
                    if(sc.getSortOrder().getOrderType() == SortOrder.ASC)
                         pageable = PageRequest.of(sc.getPageNumber(), sc.getMaxResults(), Sort.by(sc.getSortOrder().getFieldName()).ascending());
                    else
                        pageable = PageRequest.of(sc.getPageNumber(), sc.getMaxResults(), Sort.by(sc.getSortOrder().getFieldName()).descending());
                } 
                else if(sc.getPageNumber() != null && sc.getMaxResults() != null)
                    pageable = PageRequest.of(sc.getPageNumber(), sc.getMaxResults());
            }
            else 
               sc = null;
        } catch (IOException ex) {
            Logger.getLogger(CriteriaService.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return pageable;
    }
}
