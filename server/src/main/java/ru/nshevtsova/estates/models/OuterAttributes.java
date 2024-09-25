package ru.nshevtsova.estates.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@ToString
public class OuterAttributes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private @NonNull int floor;
    private @NonNull int allFloors;
    private @NonNull int releaseDate; // год сдачи
    private boolean hasParking;
    private String description;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "estate_id")
    private Estate estate;

}
