package ru.nshevtsova.estates.models;

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
public class InsideAttributes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private @NonNull int roomsAmount;
    private @NonNull double totalSizeSquareMeters;
    private double kitchenSizeSquareMeters;
    private boolean hasParking; // отделка
    private double ceilHeight;
    private int toiletsAmount;

    @OneToOne
    @JoinColumn(name = "estate_id")
    private Estate estate;
}
