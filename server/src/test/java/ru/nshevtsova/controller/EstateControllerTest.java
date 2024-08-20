package ru.nshevtsova.controller;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

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
public class EstateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    Random rand = new Random();
    String chars = IntStream.range(90, 120).mapToObj(num -> String.format("%c", num)).collect(Collectors.joining()).concat(" ");

    @Test
    void saveEstate() throws Exception {
        JSONObject json = new JSONObject();
        json.put("price", rand.nextInt(900_000, 20_000_000));
        json.put("address", randomizeString());
        json.put("estateType", rand.nextDouble() > 0.5 ? "building" : "house");
        json.put("floor", rand.nextInt(1, 20));
        json.put("allFloors", rand.nextInt(1, 20));
        json.put("releaseDate", rand.nextInt(1950, 2024)); // год сдачи
        json.put("isThereParking", rand.nextDouble() > 0.5);
        json.put("windowViewDescription", randomizeString() + randomizeString());
        json.put("roomsAmount", rand.nextInt(1, 6));
        json.put("totalSizeSquareMeters", Double.parseDouble("%.2f".formatted(rand.nextDouble(22, 160))));
        json.put("kitchenSizeSquareMeters", Double.parseDouble("%.2f".formatted(rand.nextDouble(8, 36))));
        json.put("finishing", rand.nextDouble(1) > 0.5); // отделка
        json.put("ceilHeight", Double.parseDouble("%.2f".formatted(rand.nextDouble(2, 4))));
        json.put("toiletsAmount", rand.nextInt(4));

        final String url = "http://localhost:8080" + "/reviews/add";
        mockMvc.perform(post(url)
                        .content(json.toString())
                        .contentType("application/json"))
                .andExpect(status().isOk())
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
