package ru.nshevtsova.reviews;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import org.aspectj.weaver.bcel.ClassPathManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * ReviewServer
 */
@Service
public class ReviewService {

    @Autowired
    private ReviewRepo repo;

    public List<Review> listRecent(int amount) {
        final Pageable requestedAmountRestriction = PageRequest.of(0, amount);
        return repo.findRecentlyAdded(requestedAmountRestriction);
    }

    public Review addReview(Review review) {
        return repo.save(review);
    }

    public void saveUserPic(Long reviewId, MultipartFile userPic) throws IOException {
        final Resource resource = new ClassPathResource("")
        final Review review = repo.findById(reviewId).get();
        File file = new File(reviewsDirPath.getPath(),
                "%d_%s_%s.jpg".formatted(reviewId, review.getName(), review.getSurname()));

        userPic.transferTo(file);
    }

}