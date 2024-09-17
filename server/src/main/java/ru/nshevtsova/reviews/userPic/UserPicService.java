package ru.nshevtsova.reviews.userPic;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.IMarkerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import ru.nshevtsova.reviews.Review;
import ru.nshevtsova.reviews.ReviewRepo;

/**
 * UserPicService
 */
@Service
public class UserPicService {

    @Value("${HOME}")
    private String HOME_FOLDER;
    private static final String IMAGES_PATH = "/Pictures/realtor/images";

    @Autowired
    private ReviewRepo repo;

    private Logger log = LoggerFactory.getLogger(this.getClass());

    // TODO make notification for user which tries to save image more than 5MB
    // TODO make image compression functionality
    public String saveUserPic(UserPic pic) throws IOException {
        File saveDir = new File(HOME_FOLDER + IMAGES_PATH);
        if (!saveDir.exists()) {
            saveDir.mkdirs();
        }

        final Review review = repo.findById(pic.reviewId()).get();
        Assert.hasLength(pic.userPic().getOriginalFilename(),
                "Couldn't determine image original filename to get file extension. /reviews/user-pics/add");
        final String fileExtension = pic.userPic().getContentType()
                .substring(pic.userPic().getContentType().lastIndexOf("/") + 1);

        final File file = new File(
                "%s/%d-%s-%s.%s".formatted(
                        saveDir.getPath(),
                        pic.reviewId(),
                        review.getName(),
                        review.getSurname(),
                        fileExtension));

        pic.userPic().transferTo(file);
        return file.getName();
    }

    public void deleteUserPic(long id) throws IOException {
        String imgsStoragePath = HOME_FOLDER + IMAGES_PATH + "/";
        Review review = repo.findById(id).orElseThrow();
        String formattedFilename = "%d-%s-%s".formatted(review.getId(), review.getName(), review.getSurname());
        String filename = Files.list(Paths.get(imgsStoragePath))
                .filter(name -> {
                    Pattern pattern = Pattern.compile(formattedFilename);
                    Matcher matcher = pattern.matcher(name.toString());
                    return matcher.find();
                })
                .findFirst()
                .orElseThrow()
                .toString();

        Files.delete(Paths.get(filename));
    }

    public Map<Long, byte[]> getImagesMatchedId(List<Long> ids) {
        Map<Long, byte[]> foundImages = new HashMap<>(ids.size());
        try {
            Files.list(Paths.get(HOME_FOLDER + IMAGES_PATH))
                    .forEach(filePath -> {
                        String filename = filePath.getFileName().toString();
                        String[] split = filename.split("-");
                        long id = Long.parseLong(split[0]);
                        if (ids.contains(id)) {
                            try {
                                foundImages.put(id, Files.readAllBytes(filePath));
                            } catch (IOException e) {
                                log.warn("Cannot write user picture bytes of \"{}\" to hashmap.", filename);
                            }
                        }
                    });
        } catch (IOException e) {
            log.error("Couldn't access image storage folder by path {}", HOME_FOLDER + IMAGES_PATH);
        }
        return foundImages;
    }

}
