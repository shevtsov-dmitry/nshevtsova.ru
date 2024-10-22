package ru.nshevtsova.controller;

import jakarta.annotation.PostConstruct;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CertificatesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Value("${SERVER_URL}")
    private String serverUrl;
    private String endpointUrl;

    @PostConstruct
    void init() {
        endpointUrl = serverUrl + "/certificates";
    }

    private static Integer savedImageId;
    String filename = "test-image.png";
    File testImageFile = new File("src/test/java/ru/nshevtsova/resources/images/" + filename);
    byte[] imageFileBytes = Files.readAllBytes(testImageFile.toPath());
    MockMultipartFile mvcImageFile = new MockMultipartFile("image", filename, "image/png", imageFileBytes);

    CertificatesControllerTest() throws IOException {
    }

    @Order(1)
    @Test
    void saveOne() throws Exception {
        assertThat(imageFileBytes).isNotEmpty();

        String url = "%s/save".formatted(endpointUrl);

        mockMvc.perform(multipart(url)
                        .file(mvcImageFile))
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN_VALUE))
                .andExpect(content().string(Matchers.matchesPattern("\\d+")))
                .andDo(result -> {
                    savedImageId = Integer.parseInt(result.getResponse().getContentAsString());
                });
    }

    @Order(2)
    @Test
    void getSaved() throws Exception {
        assertThat(savedImageId).isNotNull();

        String url = "%s/get/by/id/%d".formatted(endpointUrl, savedImageId);

        mockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(result -> {
                    JsonParser jsonParser = JsonParserFactory.getJsonParser();
                    Map<String, Object> certificateJson = jsonParser.parseMap(result.getResponse().getContentAsString());
                    assertThat(certificateJson).containsEntry("filename", filename);
                    byte[] savedImageBytes = Base64.getDecoder().decode((String) certificateJson.get("content"));
                    assertThat(savedImageBytes.length).isLessThan(imageFileBytes.length);
                });
    }

    @Order(3)
    @Test
    void getSavedFromAll() throws Exception {
        String url = "%s/get/all".formatted(endpointUrl);

        mockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(result -> {
                    JsonParser jsonParser = JsonParserFactory.getJsonParser();
                    List<Object> images = jsonParser.parseList(result.getResponse().getContentAsString());
                    assertThat(images).isNotEmpty();
                    Map<String, String> certificateJson = (LinkedHashMap<String, String>) images.getLast();
                    assertThat(certificateJson).containsEntry("filename", filename);
                    byte[] savedImageBytes = Base64.getDecoder().decode(certificateJson.get("content"));
                    assertThat(savedImageBytes).isNotEmpty();
                    assertThat(savedImageBytes.length).isLessThan(imageFileBytes.length);
                });
    }

    @Order(4)
    @Test
    void deleteSaved() throws Exception {
        String url = "%s/delete/by/id/%d".formatted(endpointUrl, savedImageId);

        mockMvc.perform(delete(url))
                .andExpect(status().isOk());
    }

    @Test
    void delete_byNonExistentId() throws Exception {
        String url = "%s/delete/by/id?=%d".formatted(endpointUrl, Integer.MAX_VALUE);

        mockMvc.perform(delete(url))
                .andExpect(status().isNotFound());
    }

    @Test
    void save_NotAnImage() throws Exception {
        String url = "%s/save".formatted(endpointUrl);

        mockMvc.perform(multipart(url)
                        .file("image", "nothing".getBytes()))
                .andExpect(status().isBadRequest())
                .andExpect(header().exists("message"))
                .andExpect(header().string("message", Matchers.not(Matchers.emptyString())));
    }

//    @Test
//    void () throws Exception {
//        String url = "%s/save".formatted(endpointUrl);
//
//        mockMvc.perform(post(url))
//                .andExpect(status().isBadRequest())
//                .andExpect(header().exists("message"))
//                .andExpect(header().string("message", Matchers.not(Matchers.emptyString())));
//}

}
