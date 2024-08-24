package ru.nshevtsova.estates.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nshevtsova.estates.models.OuterAttributes;

@Repository
public interface OuterAttributesRepo  extends JpaRepository<OuterAttributes, Long> {
}
