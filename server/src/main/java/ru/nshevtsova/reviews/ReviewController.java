package ru.nshevtsova.reviews;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * ReviewController
 */
@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @GetMapping("/get/recent/{amount}")
    public ResponseEntity<List<Review>> listRecent(@PathVariable int amount) {
        List<Review> recentReviews = service.listRecent(amount);
        return ResponseEntity.ok(recentReviews);
    }

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        return ResponseEntity.ok(service.addReview(review));
    }

    @PostMapping("/save/userPic")
    public ResponseEntity<String> saveUserPic(@RequestParam Long reviewId, @RequestParam MultipartFile userPic) {
        try {
            service.saveUserPic(reviewId, userPic);
            return ResponseEntity.ok("");
        } catch (IOException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}