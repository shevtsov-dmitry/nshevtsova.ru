package ru.nshevtsova.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Repeat;
import org.springframework.test.web.servlet.MockMvc;

import ru.nshevtsova.custom.CustomTestUtils;

import java.util.Random;
import java.util.random.RandomGenerator;

/**
 * ReviewControllerTest
 */
@SpringBootTest
@AutoConfigureMockMvc
public class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Value("${SERVER_URL}")
    private String CURRENT_SERVER_URL;
    private String ENDPOINT_URL;

    @BeforeEach
    void initialize() {
        ENDPOINT_URL = CURRENT_SERVER_URL + "/reviews";
    }

    @Test
    void saveUserReview() throws Exception {
        String url = ENDPOINT_URL + "/add";
        JSONObject json = new JSONObject();
        String[] nameSurname = CustomTestUtils.generateNameSurname();
        json.put("name", nameSurname[0]);
        json.put("surname", nameSurname[1]);
        json.put("stars", RandomGenerator.getDefault().nextInt(5));
        json.put("reviewText", CustomTestUtils.generateUserReview());

        mockMvc.perform(
                post(url)
                        .content(json.toString())
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andDo(result -> System.out.println(result.getResponse().getContentAsString()));
    }

}
