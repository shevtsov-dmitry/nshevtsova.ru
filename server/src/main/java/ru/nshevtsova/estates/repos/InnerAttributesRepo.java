package ru.nshevtsova.estates.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.nshevtsova.estates.models.InsideAttributes;

@Repository
public interface InnerAttributesRepo  extends JpaRepository<InsideAttributes, Long> {
}
