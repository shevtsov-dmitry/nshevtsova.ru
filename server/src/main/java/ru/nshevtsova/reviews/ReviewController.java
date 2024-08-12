package ru.nshevtsova.reviews;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ReviewController
 */
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @GetMapping("/list/recent/{amount}")
    public ResponseEntity<List<Review>> listRecent(@PathVariable int amount) {
        List<Review> recentReviews = service.listRecent(amount);
        return ResponseEntity.ok(recentReviews);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        try {
            return ResponseEntity.ok(service.addReview(review).toString());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
