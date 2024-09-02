package ru.nshevtsova.reviews.userPic;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * UserPic
 */
@RestController
@RequestMapping("/reviews/user-pics")
public class UserPicController {

    @Autowired
    private UserPicService service;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestParam Long reviewId, @RequestParam MultipartFile userPic) {
        try {
            String filename = service.saveUserPic(new UserPic(reviewId, userPic));
            return ResponseEntity.ok(filename);
        } catch (IOException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/get/by-ids", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<Long, byte[]>> getImagesMatchedId(@RequestBody List<Long> ids) {
        Map<Long, byte[]> matchedImages = service.getImagesMatchedId(ids);
        return matchedImages.size() != 0 ? ResponseEntity.ok(matchedImages) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam long id) {
        try {
            service.deleteUserPic(id);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }

    }
}
