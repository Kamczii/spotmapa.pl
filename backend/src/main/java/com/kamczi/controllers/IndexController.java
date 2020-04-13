
package com.kamczi.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kamil
 */
@RestController
public class IndexController {
     @ResponseBody
    @RequestMapping("/")
    String index() {
        return "I am public";
    }

    @RequestMapping("/api/whoami")
    Object user() {
        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();

        return auth;
    }
}
