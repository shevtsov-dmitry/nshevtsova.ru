package ru.nshevtsova.estates;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.nshevtsova.estates.enums.EstateType;
import ru.nshevtsova.estates.models.Estate;
import ru.nshevtsova.estates.models.EstatesDataHolder;
import ru.nshevtsova.estates.models.InnerAttributes;
import ru.nshevtsova.estates.models.OuterAttributes;
import ru.nshevtsova.estates.repos.EstateRepo;
import ru.nshevtsova.estates.repos.InnerAttributesRepo;
import ru.nshevtsova.estates.repos.OuterAttributesRepo;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Service
public class EstateService {

    private final EstateRepo estateRepo;
    private final InnerAttributesRepo innerAttributesRepo;
    private final OuterAttributesRepo outerAttributesRepo;
//    private final Logger LOG = LoggerFactory.getLogger(EstateService.class);

    public EstateService(EstateRepo estateRepo,
                         InnerAttributesRepo innerAttributesRepo,
                         OuterAttributesRepo outerAttributesRepo) {
        this.estateRepo = estateRepo;
        this.innerAttributesRepo = innerAttributesRepo;
        this.outerAttributesRepo = outerAttributesRepo;
    }

    public Estate addNewEstate(List<LinkedHashMap> jsonMapList) {

        Estate estate = new Estate();
        InnerAttributes inAttr = new InnerAttributes();
        OuterAttributes outAttr = new OuterAttributes();

        // TODO check them all for null. Currently doesn't save even when json has one empty parameter
        // FIXME remake on record mapper
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
                inAttr.setHasFinishing((boolean) map.get("hasFinishing"));
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

    public List<EstatesDataHolder> getRecentEstates(int amount) {
        final Pageable requestedAmountRestriction = PageRequest.of(0, amount);
        List<Estate> recentEstates = estateRepo.findRecentlyAdded(requestedAmountRestriction);
        List<EstatesDataHolder> dataHolderList = new ArrayList<>(recentEstates.size());
        for (Estate estate : recentEstates) {
            // FIXME exclude Estate object from inner and outer atributes jsons to optimize transferred memory
            InnerAttributes inAttr = innerAttributesRepo.getByEstateId(estate.getId());
            OuterAttributes outAttr = outerAttributesRepo.getByEstateId(estate.getId());
            dataHolderList.add(new EstatesDataHolder(estate, inAttr, outAttr));
        }
        return dataHolderList;
    }

}
