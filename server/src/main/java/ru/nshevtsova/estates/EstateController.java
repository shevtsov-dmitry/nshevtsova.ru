package ru.nshevtsova.estates;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.nshevtsova.estates.models.EstatesDataHolder;

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

    @DeleteMapping("/delete/by/id/{estateId}")
    public ResponseEntity<Object> deleteEstateById(@PathVariable long estateId) {
        service.deleteEstateById(estateId);
		return ResponseEntity.ok().build();
    }
}
