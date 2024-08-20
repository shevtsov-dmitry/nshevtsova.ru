package ru.nshevtsova.estates;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import ru.nshevtsova.estates.types.Estate;
import ru.nshevtsova.estates.types.EstateInsideAttributes;
import ru.nshevtsova.estates.types.EstateOutsideAttributes;

@Service
public class EstateService {

    public Estate addNewEstate(List<LinkedHashMap> estateData) {
        Estate estate = null;
        EstateOutsideAttributes outAttr = null;
        EstateInsideAttributes inAttr = null;

        return null;
    }

}
