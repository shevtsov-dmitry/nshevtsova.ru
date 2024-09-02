package ru.nshevtsova.controller;

import org.json.JSONObject;
import org.junit.jupiter.api.RepeatedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Random;

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
    // @Test
    void saveEstate() throws Exception {
        final var estate = new JSONObject();

        // final String noImageIconBase64 =
        // "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAnXAAAJ1wGxbhe3AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAActJREFUOI2dkD1oU2EUhp/33iLFSdHhVprYtLaL0tyquOQKzR0sDgp2s4MuXcSldqyLgyIu16C4qHv9w8WtQyKSQAXBqPiXClUKGkGUYAsdmnscoiGWEEKf5cCB9/m+87p+kC14icGd1ZXlRbaA6yWHdiCue4lUbSsSAfiZ8A5iGuNCuZTPjQbhCQd6Owet8rJYeOUeDLKHkI4BjxGXvUSqZuIXpgOIVcFGe4HO9yUHPvbEaBC4Vy7mH/qZ8AcicmEudmwPxlS8vefw64WFtc0CPwgBjTity3IpnwMeGVwldipCz7RWP9LpFGfzQqLQmHGE2ft11l/4QfgmHYSnuhLs83bdBs0IniCiXrZNG/ZccD+dyU52FIyOj/d/qv68WC4evRnXOWfwXVKE8Ra4K+nBWBCebs24XjK1H2D3wPBvt25PgUkv8WWv47ABnAEkacLM5iV9Bq70JVNLQNwUmKzfNbsFDDWKwEe2CvoGDDc60YSZM4/ir6BLfwUfHACZrjXD/zCdBY7/X3DcPAeYAnCEVQC3XcPtkBSZOUuGbpjZOwGMBdm0oZEuHWlgDmO2XMrn1O3LrfiZcAYRYcx2/fVWqivLi14iVUOc/AMfcZzdCK3KYgAAAABJRU5ErkJggg==";
        // estate.put("previewImage", noImageIconBase64);
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

        final var requestJsonData = new JSONObject();
        requestJsonData.put("estate", estate);
        requestJsonData.put("innerAttributes", innerAttributes);
        requestJsonData.put("outerAttributes", outerAttributes);

        final String url = ENDPOINT_URL + "/estates/add";
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
