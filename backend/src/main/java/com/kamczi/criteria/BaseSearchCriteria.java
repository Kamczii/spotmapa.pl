/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.criteria;

/**
 *
 * @author Kamil
 */
public class BaseSearchCriteria {
    private Integer pageNumber;
    private Integer maxResults;
    private SearchOrder sortOrder;

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Integer getMaxResults() {
        return maxResults;
    }

    public void setMaxResults(Integer maxResults) {
        this.maxResults = maxResults;
    }

    public SearchOrder getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(SearchOrder sortOrder) {
        this.sortOrder = sortOrder;
    }
    
    
}
