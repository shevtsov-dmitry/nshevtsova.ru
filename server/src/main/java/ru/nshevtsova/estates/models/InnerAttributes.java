package ru.nshevtsova.estates.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

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

    private @NonNull int roomsAmount;
    private @NonNull double totalSizeSquareMeters;
    private Double kitchenSizeSquareMeters;
    private boolean hasFinishing; // отделка
    private double ceilHeight;
    private int toiletsAmount;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "estate_id")
    private Estate estate;
}
