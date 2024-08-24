package ru.nshevtsova.estates.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ru.nshevtsova.estates.enums.EstateType;

@Entity
@NoArgsConstructor
@Data
@ToString
public class Estate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int price;
    private String address;
    private EstateType estateType;

    @OneToOne(mappedBy = "estate", cascade = CascadeType.ALL, orphanRemoval = true)
    private OuterAttributes outerAttributes;

    @OneToOne(mappedBy = "estate", cascade = CascadeType.ALL, orphanRemoval = true)
    private InsideAttributes insideAttributes;

    public void setInsideAttributes(InsideAttributes insideAttributes) {
        this.insideAttributes = insideAttributes;
        insideAttributes.setEstate(this);
    }

    public void setOuterAttributes(OuterAttributes outerAttributes) {
        this.outerAttributes = outerAttributes;
        outerAttributes.setEstate(this);
    }
}