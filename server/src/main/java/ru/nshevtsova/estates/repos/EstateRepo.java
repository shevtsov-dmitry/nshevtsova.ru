package ru.nshevtsova.estates.repos;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nshevtsova.estates.models.Estate;

import java.util.List;

@Repository
public interface EstateRepo extends JpaRepository<Estate, Long> {

    @Query("SELECT e FROM Estate e ORDER BY e.createdAt DESC")
    List<Estate> findRecentlyAdded(Pageable requestedAmountRestriction);
}
