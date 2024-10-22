package ru.nshevtsova.realtor_certificates;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/certificates")
public class CertificateController {

    private final CertificateService service;
    public static final Logger log = LoggerFactory.getLogger(CertificateController.class);

    public CertificateController(CertificateService service) {
        this.service = service;
    }

    /**
     * Saves image in database as Large Data Object.
     *
     * @param certificateImage - any type of image
     * @return id of saved image as String.
     */
    @PostMapping(value = "/save", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> save(@RequestParam("image") MultipartFile certificateImage) {
        HttpHeaders httpHeaders = new HttpHeaders();
        String reqContentType = Objects.requireNonNullElse(certificateImage.getContentType(), "");
        if (!reqContentType.startsWith("image/")) {
            httpHeaders.set("message", URLEncoder.encode("Допустимо использовать только изображения. Другие типы файлов не подходят.", StandardCharsets.UTF_8));
            return new ResponseEntity<>("", httpHeaders, HttpStatus.BAD_REQUEST);
        }

        try {
            return new ResponseEntity<>(service.save(certificateImage).toString(), HttpStatus.CREATED);
        } catch (Exception e) {
            final String errMes = "Ошибка при сохранении загруженных сертификатов.";
            log.error("{} из-за {}", errMes, e.getMessage());
            httpHeaders.set("message", URLEncoder.encode(errMes, StandardCharsets.UTF_8));
            return new ResponseEntity<>("", httpHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieve all instances of saved images as json list.
     *
     * @return Json list with metadata and images content, which represented as base64 string.
     */
    @GetMapping(value = "/get/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Certificate>> getAll() {
        List<Certificate> certificates = service.getAll();
        return !certificates.isEmpty() ?
                new ResponseEntity<>(certificates, HttpStatus.OK) :
                new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_FOUND);
    }

    /**
     * Retrieve single instance of saved image.
     *
     * @return Json list with metadata and images content, which represented as base64 string
     */
    @GetMapping("/get/by/id/{id}")
    public ResponseEntity<Certificate> getById(@PathVariable int id) {
        try {
            return new ResponseEntity<>(service.getById(id).orElseThrow(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @DeleteMapping("/delete/by/id/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable int id) {
        try {
            service.deleteCertificateById(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
