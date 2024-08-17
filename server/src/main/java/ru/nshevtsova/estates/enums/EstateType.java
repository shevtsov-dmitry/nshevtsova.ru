package ru.nshevtsova.estates.enums;

import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public enum EstateType {
    ROOM("КВАРТИРА"),
    HOUSE("ДОМ"),;

    private String typeName;
}




