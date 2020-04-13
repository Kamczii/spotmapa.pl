/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.colletctions;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Kamil
 */
public class PageWrapper<T> {
    List<T> results = new ArrayList<>();
    
    protected long rows;

    public List<T> getResults() {
        return results;
    }

    public long getRows() {
        return rows;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }

    public void setRows(long rows) {
        this.rows = rows;
    }
    
    
}
