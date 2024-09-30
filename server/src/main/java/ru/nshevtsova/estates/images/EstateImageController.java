package ru.nshevtsova.estates.images;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/estates/images")
public class EstateImageController {

    @Autowired
    private EstateImageService service;

    @GetMapping("/get/by/id/{estateId}")
    public ResponseEntity<List<byte[]>> getImagesByEstateId(@PathVariable Long estateId) {
        return ResponseEntity.ok(service.getImagesByEstateId(estateId));
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveImages(@RequestParam Long estateId, @RequestParam List<MultipartFile> images) {
        return ResponseEntity.ok(service.saveImages(estateId, images));
    }

}
