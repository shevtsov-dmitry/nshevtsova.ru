package ru.nshevtsova.estates.images;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/estates/images")
public class EstateImageController {

    private final EstateImageService service;
    private static final Logger log = LoggerFactory.getLogger(EstateImageController.class);

    public EstateImageController(EstateImageService service) {
        this.service = service;
    }

    @GetMapping("/get/by/id/{estateId}")
    public ResponseEntity<List<byte[]>> getImagesByEstateId(@PathVariable Long estateId) {
        try {
            var images = service.getImagesByEstateId(estateId);
            return ResponseEntity.ok(images);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/with/filename/by/id/{estateId}")
    public ResponseEntity<Map<String, byte[]>> getImagesByEstateIdWithNames(@PathVariable Long estateId) {
        try {
            var imagesWithNames = service.getImagesByEstateIdWithNames(estateId);
            return ResponseEntity.ok(imagesWithNames);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveImages(@RequestParam Long estateId, @RequestParam List<MultipartFile> images) {
        return ResponseEntity.ok(service.saveImages(estateId, images));
    }

    @DeleteMapping("/delete/by/id/{estateId}")
    public ResponseEntity<String> wipeAllImagesFromFolder(@PathVariable Long estateId) {
        try {
            service.wipeAllImagesFromFolder(estateId);
            return new ResponseEntity<>("", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            String errorMes = "Couldn't delete a certain file from id folder: %d. Error: %s".formatted(estateId, e.getMessage());
            log.warn(errorMes);
            return new ResponseEntity<>(errorMes, HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            log.warn(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
