package ru.nshevtsova.estates.enums;

/**
 * FinishingType
 */
public enum FinishingType {

    CLEAN("чистовая"),
    BLACK("черновая"),
    UNKNOWN("неизвестно"),
    ;

    private String name;

    FinishingType(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
