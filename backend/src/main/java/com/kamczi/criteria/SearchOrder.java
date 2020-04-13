/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.criteria;

import com.kamczi.enums.SortOrder;

/**
 *
 * @author Kamil
 */
public class SearchOrder {
    private String fieldName;
    
    private SortOrder orderType;

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public SortOrder getOrderType() {
        return orderType;
    }

    public void setOrderType(SortOrder orderType) {
        this.orderType = orderType;
    }
    
    
}
