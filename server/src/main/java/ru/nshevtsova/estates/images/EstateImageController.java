package ru.nshevtsova.estates.images;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/estates/images")
public class EstateImageController {

    private final EstateImageService service;

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

}
