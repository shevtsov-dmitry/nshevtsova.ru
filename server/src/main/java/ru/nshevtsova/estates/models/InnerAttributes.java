package ru.nshevtsova.estates.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.*;
import ru.nshevtsova.estates.utils.JsonCommaDeserializer;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class InnerAttributes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private @NonNull Integer roomsAmount;
    @JsonDeserialize(using = JsonCommaDeserializer.class)
    private @NonNull Double totalSizeSquareMeters;
    @JsonDeserialize(using = JsonCommaDeserializer.class)
    private Double kitchenSizeSquareMeters;
    @JsonDeserialize(using = JsonCommaDeserializer.class)
    private Double ceilHeight;
    private boolean hasFinishing; // отделка
    private int toiletsAmount;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "estate_id")
    private Estate estate;

}
