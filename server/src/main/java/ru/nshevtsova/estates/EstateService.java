package ru.nshevtsova.estates;

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

import java.util.ArrayList;
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

    public Estate addNewEstate(EstatesDataHolder dataHolder) {
        Estate estate = new Estate();
            outerAttributesRepo.save(dataHolder.outerAttributes());
            innerAttributesRepo.save(dataHolder.innerAttributes());
            estateRepo.save(dataHolder.estate());
        return estate;
    }

    public List<EstatesDataHolder> getRecentEstates(int amount) {
        final Pageable requestedAmountRestriction = PageRequest.of(0, amount);
        List<Estate> recentEstates = estateRepo.findRecentlyAdded(requestedAmountRestriction);
        List<EstatesDataHolder> dataHolderList = new ArrayList<>(recentEstates.size());
        for (Estate estate : recentEstates) {
            // FIXME exclude Estate object from inner and outer attributes jsons to optimize transferred memory
            InnerAttributes inAttr = innerAttributesRepo.getByEstateId(estate.getId());
            OuterAttributes outAttr = outerAttributesRepo.getByEstateId(estate.getId());
            dataHolderList.add(new EstatesDataHolder(estate, inAttr, outAttr));
        }
        return dataHolderList;
    }

}
