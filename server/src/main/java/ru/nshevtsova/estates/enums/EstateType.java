package ru.nshevtsova.estates.enums;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@AllArgsConstructor
@ToString
public enum EstateType {
    APARTMENT("APARTMENT"),
    HOUSE("HOUSE"),
    ;

    private String typeName;
}




