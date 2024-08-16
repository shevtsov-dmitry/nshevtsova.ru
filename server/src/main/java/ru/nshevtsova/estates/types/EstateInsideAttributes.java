package ru.nshevtsova.estates.types;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class EstateInsideAttributes {
    private @NonNull  int roomsAmount;
    private @NonNull float totalSizeSquareMeters;
    private float kitchenSizeSquareMeters;
    private @NonNull boolean finishing; // отделка
    private float ceilHeight;
    private short toiletsAmount;
}
