package ru.nshevtsova.reviews;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ReviewController
 */
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @GetMapping("/get/recent/{amount}")
    public ResponseEntity<List<Review>> listRecent(@PathVariable int amount) {
        List<Review> recentReviews = service.listRecent(amount);
        return ResponseEntity.ok(recentReviews);
    }

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        return ResponseEntity.ok(service.addReview(review));
    }
}
