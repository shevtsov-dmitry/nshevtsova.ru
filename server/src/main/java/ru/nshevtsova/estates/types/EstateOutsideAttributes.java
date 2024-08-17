package ru.nshevtsova.estates.types;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
public class EstateOutsideAttributes {

    private int floor;
    private int allFloors;
    private int releaseDate; // год сдачи
    private boolean isThereParking;
    private String windowViewDescription;
}
