package ru.nshevtsova.estates;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.nshevtsova.estates.models.Estate;
import ru.nshevtsova.estates.models.EstatesDataHolder;
import ru.nshevtsova.estates.models.InnerAttributes;
import ru.nshevtsova.estates.models.OuterAttributes;
import ru.nshevtsova.estates.repos.EstateRepo;
import ru.nshevtsova.estates.repos.InnerAttributesRepo;
import ru.nshevtsova.estates.repos.OuterAttributesRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EstateService {

    private final EstateRepo estateRepo;
    private final InnerAttributesRepo innerAttributesRepo;
    private final OuterAttributesRepo outerAttributesRepo;
    private final Logger log = LoggerFactory.getLogger(EstateService.class);

    public EstateService(EstateRepo estateRepo,
                         InnerAttributesRepo innerAttributesRepo,
                         OuterAttributesRepo outerAttributesRepo) {
        this.estateRepo = estateRepo;
        this.innerAttributesRepo = innerAttributesRepo;
        this.outerAttributesRepo = outerAttributesRepo;
    }

    public EstatesDataHolder addNewEstate(EstatesDataHolder dataHolder) {
        final Estate estate = dataHolder.estate();
        final InnerAttributes innerAttributes = dataHolder.innerAttributes();
        innerAttributes.setEstate(estate);
        final OuterAttributes outerAttributes = dataHolder.outerAttributes();
        outerAttributes.setEstate(estate);

        return new EstatesDataHolder(
                estateRepo.save(estate),
                innerAttributesRepo.save(innerAttributes),
                outerAttributesRepo.save(outerAttributes)
        );
    }

    public List<EstatesDataHolder> getRecentEstates(int amount) {
        final Pageable requestedAmountRestriction = PageRequest.of(0, amount);
        final List<Estate> recentEstates = estateRepo.findRecentlyAdded(requestedAmountRestriction);
        final List<EstatesDataHolder> dataHolderList = new ArrayList<>(recentEstates.size());

        for (Estate estate : recentEstates) {
            InnerAttributes inAttr = innerAttributesRepo.getByEstateId(estate.getId());
            if (inAttr == null) {
                log.warn("Inner attributes not found. /estates/get/recent/{amount}");
            }
            OuterAttributes outAttr = outerAttributesRepo.getByEstateId(estate.getId());
            if (outAttr == null) {
                log.warn("Outer attributes not found. /estates/get/recent/{amount}");
            }
            dataHolderList.add(new EstatesDataHolder(estate, inAttr, outAttr));
        }

        log.debug("Sent dataHolderList: {} at time: {}", dataHolderList.size(), LocalDateTime.now());
        return dataHolderList;
    }

}
