package ru.nshevtsova.reviews;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.NoSuchFileException;
import java.nio.file.Paths;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private Logger log = LoggerFactory.getLogger(ReviewService.class);

    public List<Review> listRecent(int amount) {
        final Pageable requestedAmountRestriction = PageRequest.of(0, amount);
        return repo.findRecentlyAdded(requestedAmountRestriction);
    }

    public Review addReview(Review review) {
        return repo.save(review);
    }

    public void saveUserPic(Long reviewId, MultipartFile userPic) throws IOException, NoSuchFileException {
        final Review review = repo.findById(reviewId).get();
        final Resource directory = new ClassPathResource("images/reviews");

        try {
            String originalFilename = userPic.getOriginalFilename();
            String filenameExtension = originalFilename.substring(originalFilename.lastIndexOf('.') + 1);
            URI uri = new URI("%s/%d-%s-%s.%s".formatted(
                    directory.getURI(),
                    reviewId,
                    review.getName(),
                    review.getSurname(),
                    filenameExtension
            ));
            userPic.transferTo(Paths.get(uri.getPath()));
        } catch (URISyntaxException e) {
            log.error("cannot construct uri /reviews/save/userPic");
            throw new IOException();
        }
    }

}
