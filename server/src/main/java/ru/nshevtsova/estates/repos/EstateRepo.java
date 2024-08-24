package ru.nshevtsova.estates.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nshevtsova.estates.models.Estate;

@Repository
public interface EstateRepo extends JpaRepository<Estate, Long> {
}
