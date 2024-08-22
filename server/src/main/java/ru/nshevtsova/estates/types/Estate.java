package ru.nshevtsova.estates.types;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ru.nshevtsova.estates.enums.EstateType;

@Entity
@NoArgsConstructor
@Data
public class Estate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int price;
    private String address;
    private EstateType estateType;

    @OneToOne(mappedBy = "estate", cascade = CascadeType.ALL, orphanRemoval = true)
    private EstateOutsideAttributes outsideAttributes;

    @OneToOne(mappedBy = "estate", cascade = CascadeType.ALL, orphanRemoval = true)
    private EstateInsideAttributes insideAttributes;

    // Convenience methods to set bi-directional relationships
    public void setInsideAttributes(EstateInsideAttributes insideAttributes) {
        this.insideAttributes = insideAttributes;
        insideAttributes.setEstate(this);
    }

    public void setOutsideAttributes(EstateOutsideAttributes outsideAttributes) {
        this.outsideAttributes = outsideAttributes;
        outsideAttributes.setEstate(this);
    }
}