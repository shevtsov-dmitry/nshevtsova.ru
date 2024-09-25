package ru.nshevtsova.controller;

import org.json.JSONObject;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * EstateController
 */
@SpringBootTest
@AutoConfigureMockMvc
@Rollback(value = false)
public class EstateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Value("${SERVER_URL}")
    private String ENDPOINT_URL;
    private final Random rand = new Random();
    private final String chars = "abcdefghijclmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыйэюя.?!".concat(" ".repeat(5));
    private static Long savedEstateId = 0L;

     @RepeatedTest(15)
//    @Test
    void saveEstate() throws Exception {
        final var estate = new JSONObject();

        // final String noImageIconBase64 =
        // "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAnXAAAJ1wGxbhe3AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAActJREFUOI2dkD1oU2EUhp/33iLFSdHhVprYtLaL0tyquOQKzR0sDgp2s4MuXcSldqyLgyIu16C4qHv9w8WtQyKSQAXBqPiXClUKGkGUYAsdmnscoiGWEEKf5cCB9/m+87p+kC14icGd1ZXlRbaA6yWHdiCue4lUbSsSAfiZ8A5iGuNCuZTPjQbhCQd6Owet8rJYeOUeDLKHkI4BjxGXvUSqZuIXpgOIVcFGe4HO9yUHPvbEaBC4Vy7mH/qZ8AcicmEudmwPxlS8vefw64WFtc0CPwgBjTity3IpnwMeGVwldipCz7RWP9LpFGfzQqLQmHGE2ft11l/4QfgmHYSnuhLs83bdBs0IniCiXrZNG/ZccD+dyU52FIyOj/d/qv68WC4evRnXOWfwXVKE8Ra4K+nBWBCebs24XjK1H2D3wPBvt25PgUkv8WWv47ABnAEkacLM5iV9Bq70JVNLQNwUmKzfNbsFDDWKwEe2CvoGDDc60YSZM4/ir6BLfwUfHACZrjXD/zCdBY7/X3DcPAeYAnCEVQC3XcPtkBSZOUuGbpjZOwGMBdm0oZEuHWlgDmO2XMrn1O3LrfiZcAYRYcx2/fVWqivLi14iVUOc/AMfcZzdCK3KYgAAAABJRU5ErkJggg==";
        // estate.put("previewImage", noImageIconBase64);
        estate.put("price", rand.nextInt(900_000, 20_000_000));
        estate.put("address", randomizeAddress());
        estate.put("estateType", rand.nextDouble() > 0.5 ? "APARTMENT" : "HOUSE");

        final var innerAttributes = new JSONObject();
        innerAttributes.put("roomsAmount", rand.nextInt(1, 6));
        innerAttributes.put("totalSizeSquareMeters", rand.nextDouble(22, 160));
        innerAttributes.put("kitchenSizeSquareMeters", rand.nextDouble(8, 36));
        innerAttributes.put("hasFinishing", rand.nextDouble(1) > 0.5); // отделка
        innerAttributes.put("ceilHeight", rand.nextDouble(2, 4));
        innerAttributes.put("toiletsAmount", rand.nextInt(4));

        final var outerAttributes = new JSONObject();
        outerAttributes.put("floor", rand.nextInt(1, 20));
        outerAttributes.put("allFloors", rand.nextInt(1, 20));
        outerAttributes.put("releaseDate", rand.nextInt(1950, 2024)); // год сдачи
        outerAttributes.put("hasParking", rand.nextDouble() > 0.5);
        outerAttributes.put("description", IntStream.range(0, rand.nextInt(50, 90))
                .mapToObj(idx -> String.valueOf((char) rand.nextInt(97, 122)))
                .collect(Collectors.joining()));

        final var requestJsonData = new JSONObject();
        requestJsonData.put("estate", estate);
        requestJsonData.put("innerAttributes", innerAttributes);
        requestJsonData.put("outerAttributes", outerAttributes);

        System.out.println(requestJsonData);

        final String url = ENDPOINT_URL + "/estates/add";
        mockMvc.perform(post(url)
                .content(String.valueOf(requestJsonData))
                .contentType("application/json"))
                .andExpect(status().is(200))
                .andDo(result -> System.out.println(result.getResponse().getContentAsString()));
    }

    private String randomizeAddress() {
        final var notExistentAddresses = List.of(
                "г. Рязань, Советский проспект, дом 22А, 4 подъезд, 17 квартира",
                "г. Тверь, Калининская улица, дом 9Б, 1 подъезд, 42 квартира",
                "г. Саратов, Октябрьский проспект, дом 15А, 3 подъезд, 27 квартира",
                "г. Пенза, Молодежная улица, дом 18Б, 2 подъезд, 12 квартира",
                "г. Ульяновск, Комсомольская улица, дом 21А, 1 подъезд, 35 квартира",
                "г. Иваново, Ленинский проспект, дом 25Б, 4 подъезд, 48 квартира",
                "г. Киров, Советская улица, дом 14А, 3 подъезд, 20 квартира",
                "г. Томск, Ломоносовский проспект, дом 16Б, 2 подъезд, 45 квартира",
                "г. Красноярск, Чапаевская улица, дом 19А, 1 подъезд, 30 квартира",
                "г. Пермь, Комсомольский проспект, дом 23Б, 4 подъезд, 50 квартира",
                "г. Омск, Ленинская улица, дом 17А, 2 подъезд, 32 квартира",
                "г. Нижний Новгород, Победительская улица, дом 20Б, 3 подъезд, 25 квартира",
                "г. Челябинск, Советский проспект, дом 24А, 1 подъезд, 38 квартира",
                "г. Ростов-на-Дону, Университетский проспект, дом 11Б, 2 подъезд, 15 квартира",
                "г. Волгоград, Пролетарская улица, дом 18А, 4 подъезд, 40 квартира",
                "г. Астрахань, Тatischeva улица, дом 25Б, 3 подъезд, 28 квартира",
                "г. Калуга, Молодежная улица, дом 19А, 2 подъезд, 22 квартира",
                "г. Кострома, Советская улица, дом 16Б, 1 подъезд, 33 квартира",
                "г. Курск, Кировская улица, дом 21А, 4 подъезд, 49 квартира",
                "г. Тула, Ленинский проспект, дом 18Б, 3 подъезд, 41 квартира");

        return notExistentAddresses.get(rand.nextInt(notExistentAddresses.size()));
    }

}
