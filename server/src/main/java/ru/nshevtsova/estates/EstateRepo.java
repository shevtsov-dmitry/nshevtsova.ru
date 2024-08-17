package ru.nshevtsova.estates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nshevtsova.estates.types.Estate;

@Repository
public interface EstateRepo extends JpaRepository<Estate, Long> {
}
