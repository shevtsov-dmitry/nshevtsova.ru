package ru.nshevtsova.estates.implementations;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import ru.nshevtsova.estates.types.Estate;
import ru.nshevtsova.estates.types.EstateInsideAttributes;
import ru.nshevtsova.estates.types.EstateOutsideAttributes;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class House extends Estate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private @NonNull EstateInsideAttributes insideAttributes;
    private @NonNull EstateOutsideAttributes outsideAttributes;
}
