package ru.nshevtsova.estates.images;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

@Service
public class EstateImageService {

    @Value("${HOME}")
    private String HOME_FOLDER;
    private String IMG_STORAGE_PATH_STRING;
    private static final String ID_FOLDER_FORMAT = "%s/%d";

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @PostConstruct
    private void init() {
        IMG_STORAGE_PATH_STRING = HOME_FOLDER + "/Pictures/realtor/estates";
        var imgStorage = Paths.get(IMG_STORAGE_PATH_STRING).toFile();

        if (!imgStorage.exists()) {
            imgStorage.mkdirs();
        }
    }

    // TODO also compress images
    public String saveImages(Long estateId, List<MultipartFile> images) {
        File idSaveDir = new File(ID_FOLDER_FORMAT.formatted(IMG_STORAGE_PATH_STRING, estateId));
        idSaveDir.mkdirs();

        try {
            for (int i = 0; i < images.size(); i++) {
                MultipartFile image = images.get(i);
                String newImageName = i == 0 ? "/main___" + image.getOriginalFilename()
                        : "/" + image.getOriginalFilename();
                Files.write(Paths.get(idSaveDir.toPath().toString(), newImageName),
                        image.getBytes());
            }
            return "";
        } catch (IOException e) {
            return "Error saving image: %s".formatted(e.getMessage());
        }
    }

    public List<byte[]> getImagesByEstateId(Long estateId) throws NoSuchElementException {
        File idSaveDir = new File(ID_FOLDER_FORMAT.formatted(IMG_STORAGE_PATH_STRING, estateId));
        if (!idSaveDir.exists()) {
            throw new NoSuchElementException("");
        }
        List<byte[]> images = new ArrayList<>();

        for (File image : idSaveDir.listFiles()) {
            byte[] curImageBytes = new byte[0];
            try {
                curImageBytes = Files.readAllBytes(image.toPath());
            } catch (IOException e) {
                log.warn("Couldn't append the image into array: {}", e.getMessage());
            }

            if (!images.isEmpty() && image.getName().startsWith("main___")) {
                byte[] rememberFirst = images.getFirst();
                images.set(0, curImageBytes);
                images.set(images.size() - 1, rememberFirst);
            } else {
                images.add(curImageBytes);
            }
        }
        return images;
    }

    public Map<String, byte[]> getImagesByEstateIdWithNames(Long estateId) throws NoSuchElementException {
        File idSaveDir = new File(ID_FOLDER_FORMAT.formatted(IMG_STORAGE_PATH_STRING, estateId));
        if (!idSaveDir.exists()) {
            throw new NoSuchElementException("");
        }
        final Map<String, byte[]> nameImageMap = new HashMap<>();
        for (File image : idSaveDir.listFiles()) {
            try {
                byte[] curImageBytes = Files.readAllBytes(image.toPath());
                nameImageMap.put(image.getName(), curImageBytes);
            } catch (IOException e) {
                log.warn("Couldn't append the image into hashmap: {}", e.getMessage());
            }
        }
        return nameImageMap;
    }

    public void wipeAllImagesFromFolder(Long estateId) throws IOException {
        File idSaveDir = new File(ID_FOLDER_FORMAT.formatted(IMG_STORAGE_PATH_STRING, estateId));
        if (!idSaveDir.exists()) {
            throw new NoSuchElementException("");
        }
        try (Stream<Path> walkStream = Files.walk(idSaveDir.toPath())) {
            walkStream.forEach(file -> {
                try {
                    Files.delete(file);
                } catch (IOException e) {
                    log.warn("Couldn't delete the image in id folder №{}, because: {}", estateId, e.getMessage());
                }
            });
        }
        Files.delete(idSaveDir.toPath());
    }

}
