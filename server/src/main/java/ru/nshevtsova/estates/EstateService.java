package ru.nshevtsova.estates;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.nshevtsova.estates.enums.EstateType;
import ru.nshevtsova.estates.models.Estate;
import ru.nshevtsova.estates.models.OuterAttributes;
import ru.nshevtsova.estates.models.InsideAttributes;
import ru.nshevtsova.estates.repos.EstateRepo;
import ru.nshevtsova.estates.repos.InnerAttributesRepo;
import ru.nshevtsova.estates.repos.OuterAttributesRepo;

@Service
public class EstateService {

    private final EstateRepo estateRepo;
    private final InnerAttributesRepo innerAttributesRepo;
    private final OuterAttributesRepo outerAttributesRepo;

    public EstateService(EstateRepo estateRepo, InnerAttributesRepo innerAttributesRepo, OuterAttributesRepo outerAttributesRepo) {
        this.estateRepo = estateRepo;
        this.innerAttributesRepo = innerAttributesRepo;
        this.outerAttributesRepo = outerAttributesRepo;
    }

    public Estate addNewEstate(List<LinkedHashMap> jsonMapList) {

        Estate estate = new Estate();
        InsideAttributes inAttr = new InsideAttributes();
        OuterAttributes outAttr = new OuterAttributes();

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

        // TODO try catch here
        final Estate savedEstate = estateRepo.save(estate);
        inAttr.setEstate(savedEstate);
        outAttr.setEstate(savedEstate);

        innerAttributesRepo.save(inAttr);
        outerAttributesRepo.save(outAttr);

        return estate;
    }

    public List<Estate> getRecentEstates(int amount) {
        return null;
    }

    public List<Estate> getAllEstates() {
        return estateRepo.findAll();
    }
}
