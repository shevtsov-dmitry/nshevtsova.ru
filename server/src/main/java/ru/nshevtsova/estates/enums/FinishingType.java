package ru.nshevtsova.estates.enums;

import lombok.AllArgsConstructor;
import lombok.ToString;

/**
 * FinishingType
 */
@AllArgsConstructor
@ToString
public enum FinishingType {

    CLEAN("чистовая"),
    BLACK("черновая"),
    UNKNOWN("неизвестно"),
    ;

    private String name;
}
