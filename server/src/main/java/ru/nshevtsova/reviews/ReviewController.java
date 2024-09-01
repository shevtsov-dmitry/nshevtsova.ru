package ru.nshevtsova.reviews;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ru.nshevtsova.BackendApplication;

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

    // TODO refactor all of this into new module
    @PostMapping("/userPics/save")
    public ResponseEntity<String> saveUserPic(@RequestParam Long reviewId, @RequestParam MultipartFile userPic) {
        try {
            service.saveUserPic(reviewId, userPic);
            return ResponseEntity.ok("");
        } catch (IOException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/userPics/delete")
    public ResponseEntity deleteUserPic(@RequestParam long id) {
        try {
            service.deleteUserPic();
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }

    }

}
