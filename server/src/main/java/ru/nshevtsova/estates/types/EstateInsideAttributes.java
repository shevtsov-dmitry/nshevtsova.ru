package ru.nshevtsova.estates.types;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class EstateInsideAttributes {

    private @NonNull int roomsAmount;
    private @NonNull double totalSizeSquareMeters;
    private double kitchenSizeSquareMeters;
    private @NonNull boolean finishing; // отделка
    private double ceilHeight;
    private int toiletsAmount;

}
