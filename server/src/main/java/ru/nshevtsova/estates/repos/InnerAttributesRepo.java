package ru.nshevtsova.estates.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.nshevtsova.estates.models.InnerAttributes;

@Repository
public interface InnerAttributesRepo  extends JpaRepository<InnerAttributes, Long> {
    InnerAttributes getByEstateId(Long estateId);
    void deleteByEstateId(Long estateId);
}
