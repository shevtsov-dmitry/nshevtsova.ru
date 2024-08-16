package ru.nshevtsova.estates.types;

import lombok.Data;

/**
 * Estate
 */
@Data
public abstract class Estate {

    private int price;
    private String address;

}
