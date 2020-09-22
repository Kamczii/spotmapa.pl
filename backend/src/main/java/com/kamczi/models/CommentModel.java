/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kamczi.models;

import com.kamczi.entities.Comment;
import com.kamczi.entities.Person;
import java.util.Date;

/**
 *
 * @author Kamil
 */
public class CommentModel {
    private Long comment_id;
    private String comment;
    private Date date;
    private Date edited_at;
    private Person author;
    
    public CommentModel(){}
    
    public CommentModel(Comment comment){
        this.comment_id = comment.getComment_id();
        this.author = comment.getAuthor();
        this.comment = comment.getComment();
        this.date = comment.getDate();
        this.edited_at = comment.getEdited_at();
    }

    public Person getAuthor() {
        return author;
    }

    public void setAuthor(Person author) {
        this.author = author;
    }
    
    public Long getComment_id() {
        return comment_id;
    }
    
    public String getComment() {
        return comment;
    }

    public Date getDate() {
        return date;
    }

    public Date getEdited_at() {
        return edited_at;
    }

    public void setComment_id(Long comment_id) {
        this.comment_id = comment_id;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setEdited_at(Date edited_at) {
        this.edited_at = edited_at;
    }
}
