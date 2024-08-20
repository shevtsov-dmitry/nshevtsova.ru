package ru.nshevtsova.estates;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/estates")
public class EstateController {

    private final EstateService service;

    public EstateController(EstateService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewEstate(@RequestBody List<LinkedHashMap> estateData) {
        return ResponseEntity.ok(service.addNewEstate(estateData).toString());
    }

}
