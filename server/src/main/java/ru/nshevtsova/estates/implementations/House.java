package ru.nshevtsova.estates.implementations;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import ru.nshevtsova.estates.types.Estate;

/**
 * House
 */
@Entity
public class House extends Estate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
