package ru.nshevtsova.estates.types;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class EstateOutsideAttributes {

    private short floor;
    private short allFloors;
    private short releaseDate; // год сдачи
    private boolean isThereParking;
    private String windowViewDescription;
}
