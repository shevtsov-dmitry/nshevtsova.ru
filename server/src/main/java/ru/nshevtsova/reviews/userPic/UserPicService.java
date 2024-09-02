package ru.nshevtsova.reviews.userPic;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.pulsar.PulsarConnectionDetails;
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

    public String saveUserPic(UserPic pic) throws IOException {
        File saveDir = new File(HOME_FOLDER + IMAGES_PATH);
        if (!saveDir.exists()) {
            saveDir.mkdirs();
        }

        final Review review = repo.findById(pic.reviewId()).get();
        Assert.hasLength(pic.userPic().getOriginalFilename(),
                "Couldn't determine image original filename to get file extension. /reviews/user-pics/add");
        final String fileExtension = pic.userPic().getOriginalFilename()
                .substring(pic.userPic().getOriginalFilename().lastIndexOf(".") + 1);

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

}
