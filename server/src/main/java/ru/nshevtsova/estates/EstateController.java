package ru.nshevtsova.estates;

import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.nshevtsova.estates.models.EstatesDataHolder;

import java.util.List;
import java.util.Objects;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/estates")
public class EstateController {

    private final EstateService service;

    public EstateController(EstateService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<Long> addNewEstate(@RequestBody EstatesDataHolder estateData) {
        var savedEstate = service.addNewEstate(estateData);
        Assert.notNull(savedEstate, "Couldn't save estate. /estates/add");
        return ResponseEntity.ok(savedEstate);
    }

    @PutMapping("/update")
    public ResponseEntity<EstatesDataHolder> updateEstateData(@RequestBody EstatesDataHolder estateData) {
        return ResponseEntity.ok(service.updateEstateData(estateData));
    }

    @GetMapping("/get/recent/{amount}")
    public ResponseEntity<List<EstatesDataHolder>> getRecentEstates(@PathVariable int amount) {
        var jsonList = service.getRecentEstates(amount);
        return ResponseEntity.ok(jsonList);
    }
}
