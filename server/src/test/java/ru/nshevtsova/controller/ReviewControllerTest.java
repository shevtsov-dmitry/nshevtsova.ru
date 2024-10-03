package ru.nshevtsova.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.File;
import java.nio.file.Files;
import java.util.Base64;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.random.RandomGenerator;

import org.hamcrest.Matchers;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.util.Assert;
import ru.nshevtsova.custom.records.NameSurname;
import ru.nshevtsova.custom.utils.CustomTestUtils;

/**
 * ReviewControllerTest
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ReviewControllerTest {

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

    private static final File testImageFile = new File("src/test/java/ru/nshevtsova/resources/images/test-image.png");

    @Test
    // @RepeatedTest(15)
    @Order(1)
    void saveUserReview() throws Exception {
        System.out.println(Locale.getDefault());
        String url = ENDPOINT_URL + "/add";
        JSONObject json = new JSONObject();
        NameSurname nameSurname = CustomTestUtils.generateNameSurname();
        json.put("name", nameSurname.name());
        json.put("surname", nameSurname.surname());
        json.put("stars", RandomGenerator.getDefault().nextInt(5));
        json.put("reviewText", CustomTestUtils.generateUserReview());

        mockMvc.perform(
                        post(url)
                                .content(json.toString())
                                .contentType("application/json"))
                .andExpect(status().isOk())
                .andDo(result -> {
                    String receivedJson = result.getResponse().getContentAsString();
                    Map<String, Object> map = JsonParserFactory.getJsonParser().parseMap(receivedJson);
                    savedUserId = Long.parseLong(map.get("id").toString());
                });
    }

    @Order(2)
    @Test
    void saveUserPic() throws Exception {
        Assertions.assertNotEquals(0, savedUserId);
        Assertions.assertTrue(testImageFile.exists(), "test image file does not exist");

        byte[] imageBytes = Files.readAllBytes(testImageFile.toPath());

        final var file = new MockMultipartFile("userPic", testImageFile.getName(), "multipart/form-data", imageBytes);
        final String url = ENDPOINT_URL + "/user-pics/save";
        String filename = testImageFile.getName();

        mockMvc.perform(multipart(url)
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
    void getSavedImage() throws Exception {

        final String url = ENDPOINT_URL + "/user-pics/get/by-ids";
        mockMvc.perform(post(url)
                        .contentType("application/json")
                        .content(List.of(savedUserId).toString()))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(result -> {
                    byte[] imageBytes = Files.readAllBytes(testImageFile.toPath());
                    String jsonString = result.getResponse().getContentAsString();
                    Map<String, Object> parsedJsonMap = JsonParserFactory.getJsonParser().parseMap(jsonString);
                    Object encodedImage = parsedJsonMap.get(savedUserId.toString());
                    byte[] decoded = Base64.getDecoder().decode(encodedImage.toString());
                    Assertions.assertArrayEquals(imageBytes, decoded);
                });
    }

    @Order(4)
    @Test
    void deleteSavedUserPic() throws Exception {
        final String url = ENDPOINT_URL + "/user-pics/delete?id=" + savedUserId;
        mockMvc.perform(delete(url))
                .andExpect(status().isOk());
    }

    @Test
    void deleteNonExistentUserPic() throws Exception {
        final int notPossibleId = -1;
        final String url = ENDPOINT_URL + "/user-pics/delete" + notPossibleId;
        mockMvc.perform(delete(url))
                .andExpect(status().isNotFound());
    }

}
