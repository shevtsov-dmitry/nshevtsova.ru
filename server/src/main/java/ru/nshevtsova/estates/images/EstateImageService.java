package ru.nshevtsova.estates.images;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.criteria.Path;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class EstateImageService {

    @Value("${HOME}")
    private String HOME_FOLDER;
    private final String IMAGES_PATH = "/Pictures/realtor/estates";
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostConstruct
    private void init() {
        final File imgStorage = Paths.get(HOME_FOLDER, IMAGES_PATH).toFile();
        if (!imgStorage.exists()) {
            imgStorage.mkdirs();
        }
    }

    public List<byte[]> getImagesByEstateId(Long estateId) {
        return null;
    }

    public String saveImages(Long estateId, List<MultipartFile> images) {
        try {
            for (int i = 0; i < images.size(); i++) {
                MultipartFile image = images.get(i);
                String newImageName = i == 0 ?
                        "/%d___main___%s".formatted(estateId, image.getOriginalFilename()) :
                        "/%d___%s".formatted(estateId, image.getOriginalFilename());
                Files.write(Paths.get(HOME_FOLDER, IMAGES_PATH, newImageName), image.getBytes());
            }
            return "";
        } catch (IOException e) {
            return "Error saving image: %s".formatted(e.getMessage());
        }

    }

}
