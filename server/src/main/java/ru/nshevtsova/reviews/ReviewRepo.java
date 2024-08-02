package ru.nshevtsova.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

/**
 * ReviewRepository
 */
@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {

    @Query("SELECT rev FROM Review rev ORDER BY rev.createdAt DESC")
    List<Review> findRecentlyAdded(Pageable requestedAmountRestriction);
}
