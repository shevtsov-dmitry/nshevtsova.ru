package ru.nshevtsova.reviews.userPic;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    public void saveUserPic(UserPic pic) throws IOException {
        File saveDir = new File(HOME_FOLDER + IMAGES_PATH);
        if (!saveDir.exists()) {
            saveDir.mkdirs();
        }

        final Review review = repo.findById(pic.reviewId()).get();
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
    }

    public void deleteUserPic(long id) throws IOException {
        Files.delete(Paths.get(HOME_FOLDER + IMAGES_PATH));
    }

}
