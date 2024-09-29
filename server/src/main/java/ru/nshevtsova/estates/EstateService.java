package ru.nshevtsova.estates;

import org.aspectj.apache.bcel.util.ClassPath;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ru.nshevtsova.estates.models.Estate;
import ru.nshevtsova.estates.models.EstatesDataHolder;
import ru.nshevtsova.estates.models.InnerAttributes;
import ru.nshevtsova.estates.models.OuterAttributes;
import ru.nshevtsova.estates.repos.EstateRepo;
import ru.nshevtsova.estates.repos.InnerAttributesRepo;
import ru.nshevtsova.estates.repos.OuterAttributesRepo;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
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

    public Long addNewEstate(EstatesDataHolder dataHolder) {
        var estate = estateRepo.save(dataHolder.estate());
        Assert.notNull(estate, "couldn't save estate.  estates/add");

        var innerAttributes = dataHolder.innerAttributes();
        innerAttributes.setEstate(estate);
        innerAttributes = innerAttributesRepo.save(innerAttributes);
        Assert.notNull(innerAttributes, "couldn't save outer attributes. estates/add");

        var outerAttributes = dataHolder.outerAttributes();
        outerAttributes.setEstate(estate);
        outerAttributes = outerAttributesRepo.save(outerAttributes);
        Assert.notNull(outerAttributes, "couldn't save outer attributes. estates/add");

        return estate.getId();
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

    public EstatesDataHolder updateEstateData(EstatesDataHolder estateData) {
        Estate updatedEstate = estateRepo.save(estateData.estate());
        Assert.notNull(updatedEstate, "couldn't update estate. estates/update");

        InnerAttributes innerAttributes = estateData.innerAttributes();
        innerAttributes.setEstate(updatedEstate);
        InnerAttributes updatedInnerAttributes = innerAttributesRepo.save(innerAttributes);
        Assert.notNull(updatedInnerAttributes, "couldn't update inner attributes. estates/update");

        OuterAttributes outerAttributes = estateData.outerAttributes();
        outerAttributes.setEstate(updatedEstate);
        OuterAttributes updatedOuterAttributes = outerAttributesRepo.save(outerAttributes);
        Assert.notNull(updatedOuterAttributes, "couldn't update outer attributes. estates/update");

        return new EstatesDataHolder(updatedEstate, updatedInnerAttributes, updatedOuterAttributes);
    }
}
