package ru.nshevtsova.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.random.RandomGenerator;

import org.assertj.core.api.Assertions;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import ru.nshevtsova.custom.CustomTestUtils;

/**
 * ReviewControllerTest
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
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

    private Long savedUserId = 0L;

    @Test
    // @RepeatedTest(15)
    @Order(1)
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
                .andDo(result -> {
                    savedUserId = Long.parseLong(result.getResponse().getContentAsString());
                });

    }

    @Order(2)
    @Test
    void saveUserPic() throws Exception {
        Assertions.assertThat(savedUserId != 0L);

        // Load image from current working directory
        byte[] imageBytes = Files.readAllBytes(Paths.get("test-image.png"));

        final MockMultipartFile file = new MockMultipartFile("userPic", imageBytes);
        final String url = ENDPOINT_URL + "/userPics/save";
        mockMvc.perform(
                multipart(url)
                        .file(file)
                        .queryParam("reviewId", savedUserId.toString()))
                .andExpect(status().isOk());
    }

    @Order(3)
    @Test
    void deleteSavedUserPic() throws Exception {
        Assertions.assertThat(savedUserId != 0);

        final String url = ENDPOINT_URL + "/userPics/delete?id=" + savedUserId;
        mockMvc.perform(delete(url))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteNonExistentUserPic() throws Exception {
        final int notPossibleId = -1;
        final String url = ENDPOINT_URL + "/userPics/delete" + notPossibleId;
        mockMvc.perform(delete(url))
                .andExpect(status().isNotFound());
    }

}
