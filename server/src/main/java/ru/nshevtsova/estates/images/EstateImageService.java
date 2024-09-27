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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

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
        final var imgStorage = Paths.get(HOME_FOLDER, IMAGES_PATH).toFile();
        List<byte[]> images = new ArrayList<>();
        for (File image : imgStorage.listFiles()) {
            if (!image.getName().startsWith(estateId.toString())) {
                continue;
            }

            byte[] curImageBytes = new byte[0];
            try {
                curImageBytes = Files.readAllBytes(image.toPath());
            } catch (IOException e) {
                log.warn("Couldn't append the image into array: {}", e.getMessage());
            }
            if (!images.isEmpty() && image.getName().split("___")[1].equals("main")) {
                byte[] rememberFirst = images.getFirst();
                images.set(0, curImageBytes);
                images.set(images.size() - 1, rememberFirst);
            } else {
                images.add(curImageBytes);
            }
        }
        return images;
    }

    // TODO also compress images
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
