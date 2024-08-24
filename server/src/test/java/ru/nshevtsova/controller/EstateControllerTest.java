package ru.nshevtsova.controller;

import org.assertj.core.api.Assertions;
import org.json.JSONObject;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
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

    Random rand = new Random();
    String chars = "abcdefghijclmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыйэюя.?!".concat(" ".repeat(5));

    @RepeatedTest(15)
    void saveEstate() throws Exception {
        final var estate = new JSONObject();
        estate.put("price", rand.nextInt(900_000, 20_000_000));
        estate.put("address", randomizeString());
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
        outerAttributes.put("windowViewDescription", randomizeString() + randomizeString());

        final String url = "http://localhost:8080" + "/estates/add";
        final List<JSONObject> requestJsonData = List.of(estate, innerAttributes, outerAttributes);
        System.out.println(requestJsonData);
        mockMvc.perform(post(url)
                        .content(String.valueOf(requestJsonData))
                        .contentType("application/json"))
                .andExpect(status().is(200))
                .andDo(result -> System.out.println(result.getResponse().getContentAsString()));
    }

    private String randomizeString() {
        var sb = new StringBuilder(rand.nextInt(chars.length()));
        for (int i = 0; i < sb.capacity(); i++) {
            sb.append(chars.charAt(rand.nextInt(chars.length())));
        }
        return sb.toString();
    }


}
