package ru.nshevtsova.reviews;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

}
