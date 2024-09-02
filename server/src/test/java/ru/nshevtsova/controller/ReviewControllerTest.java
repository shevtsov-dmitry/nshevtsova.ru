package ru.nshevtsova.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.random.RandomGenerator;

import org.assertj.core.api.Assertions;
import org.hamcrest.Matchers;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import ru.nshevtsova.custom.records.NameSurname;
import ru.nshevtsova.custom.utils.CustomTestUtils;

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

    private static Long savedUserId = 0L;

    @Test
    // @RepeatedTest(15)
    @Order(1)
    void saveUserReview() throws Exception {
        Assertions.assertThat(1 == 2);
        String url = ENDPOINT_URL + "/add";
        JSONObject json = new JSONObject();
        NameSurname nameSurname = CustomTestUtils.generateNameSurname();
        json.put("name", nameSurname.name());
        json.put("surname", nameSurname.surname());
        json.put("stars", RandomGenerator.getDefault().nextInt(5));
        json.put("reviewText", CustomTestUtils.generateUserReview().substring(0, 255));

        mockMvc.perform(
                post(url)
                        .content(json.toString())
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andDo(result -> {
                    String recievedJson = result.getResponse().getContentAsString();
                    Map<String, Object> map = JsonParserFactory.getJsonParser().parseMap(recievedJson);
                    savedUserId = Long.parseLong(map.get("id").toString());
                });
    }

    @Order(2)
    @Test
    void saveUserPic() throws Exception {
        Assertions.assertThat(savedUserId != 0L);
        File imageFile = new File("src/test/java/ru/nshevtsova/resources/images/test-image.png");
        Assertions.assertThat(imageFile.exists());
        byte[] imageBytes = Files.readAllBytes(imageFile.toPath());

        final MockMultipartFile file = new MockMultipartFile("userPic", imageFile.getName(), "multipart/form-data",
                imageBytes);
        final String url = ENDPOINT_URL + "/user-pics/save";
        String filename = imageFile.getName();

        mockMvc.perform(
                multipart(url)
                        .file(file)
                        .queryParam("reviewId", savedUserId.toString())
                        .header("Content-Type", "multipart/form-data")
                        .header("Content-Length", file.getSize()))
                .andExpect(status().isOk())
                .andExpect(content().string(Matchers.startsWith(savedUserId.toString())))
                .andExpect(content().string(
                        Matchers.endsWith(filename.substring(filename.lastIndexOf(".") + 1))));
    }

    @Order(3)
    @Test
    void deleteSavedUserPic() throws Exception {
        Assertions.assertThat(savedUserId != 0);

        final String url = ENDPOINT_URL + "/user-pics/delete?id=" + savedUserId;
        mockMvc.perform(delete(url))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteNonExistentUserPic() throws Exception {
        final int notPossibleId = -1;
        final String url = ENDPOINT_URL + "/user-pics/delete" + notPossibleId;
        mockMvc.perform(delete(url))
                .andExpect(status().isNotFound());
    }

}
