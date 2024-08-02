package ru.nshevtsova.reviews;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ReviewController
 */
@RestController
@RequestMapping("/v0/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @GetMapping("/list/recent/{amount}")
    public ResponseEntity<List<String>> listRecent(@PathVariable int amount) {
        List<Review> recentReviews = service.listRecent(amount);
    }

}
