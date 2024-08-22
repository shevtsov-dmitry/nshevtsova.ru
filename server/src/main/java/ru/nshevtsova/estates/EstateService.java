package ru.nshevtsova.estates;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.nshevtsova.estates.enums.EstateType;
import ru.nshevtsova.estates.types.Estate;
import ru.nshevtsova.estates.types.EstateOutsideAttributes;
import ru.nshevtsova.estates.types.EstateInsideAttributes;

@Service
public class EstateService {

    public Estate addNewEstate(List<LinkedHashMap> jsonMapList) {

        Estate estate = new Estate();
        EstateInsideAttributes inAttr = new EstateInsideAttributes();
        EstateOutsideAttributes outAttr = new EstateOutsideAttributes();

        // TODO check them all for null. Currently doesn't save even when json has one empty parameter
        for (var map : jsonMapList) {
            if (map.containsKey("price")) {
                estate.setPrice((int) map.get("price"));
                estate.setEstateType(EstateType.valueOf(map.get("estateType").toString().toUpperCase()));
                estate.setAddress((String) map.get("address"));
            } else if (map.containsKey("floor")) {
                outAttr.setFloor((int) map.get("floor"));
                outAttr.setAllFloors((int) map.get("allFloors"));
                outAttr.setHasParking((boolean) map.get("hasParking"));
                outAttr.setWindowViewDescription((String) map.get("windowViewDescription"));
                outAttr.setHasParking((boolean) map.get("hasParking"));
                outAttr.setReleaseDate((int) map.get("releaseDate"));
            } else {
                inAttr.setHasParking((boolean) map.get("hasFinishing"));
                inAttr.setCeilHeight((double) map.get("ceilHeight"));
                inAttr.setRoomsAmount((int) map.get("roomsAmount"));
                inAttr.setTotalSizeSquareMeters((double) map.get("totalSizeSquareMeters"));
                inAttr.setKitchenSizeSquareMeters((double) map.get("kitchenSizeSquareMeters"));
                inAttr.setToiletsAmount((int) map.get("toiletsAmount"));
            }

        }

        estate.setInsideAttributes(inAttr);
        estate.setOutsideAttributes(outAttr);

        return estate;
    }

}
