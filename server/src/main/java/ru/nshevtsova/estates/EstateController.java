package ru.nshevtsova.estates;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.nshevtsova.estates.implementations.Building;
import ru.nshevtsova.estates.types.Estate;
import ru.nshevtsova.estates.types.EstateInsideAttributes;
import ru.nshevtsova.estates.types.EstateOutsideAttributes;

import java.util.List;

@Controller
@RequestMapping("/estates")
public class EstateController {

    @PostMapping("/add")
    public ResponseEntity<String> addNewEstate(@RequestBody List<Object> estateData) {
        Estate estate = null;
        EstateOutsideAttributes outAttr = null;
        EstateInsideAttributes inAttr = null;

    }

}
