package ru.nshevtsova.estates;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.nshevtsova.estates.models.Estate;

import java.util.LinkedHashMap;
import java.util.List;

@Controller
@RequestMapping("/estates")
public class EstateController {

    private final EstateService service;

    public EstateController(EstateService service) {
        this.service = service;
    }

    @PostMapping("/add")
    // TODO specify JSONObject type
    public ResponseEntity<Estate> addNewEstate(@RequestBody List<LinkedHashMap> estateData) {
        var savedEstate = service.addNewEstate(estateData);
        Assert.notNull(savedEstate, "ERROR (NULL): couldn't save estate /estates/add");
        return ResponseEntity.ok(savedEstate);
    }

}
