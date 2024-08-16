package ru.nshevtsova.estates.implementations;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import ru.nshevtsova.estates.types.Estate;

/**
 * Building
 */

@Entity
@NoArgsConstructor
public class Building extends Estate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BalconyType balcony;

    @ToString
    @RequiredArgsConstructor
    enum BalconyType {
        LOGGIA("лоджия"),
        BALCONY("балкон"),
        ;

        private @NonNull String typeName;

    }

}
