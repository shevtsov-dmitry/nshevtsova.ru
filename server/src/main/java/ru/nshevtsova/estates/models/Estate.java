package ru.nshevtsova.estates.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import ru.nshevtsova.estates.enums.EstateType;

import java.time.LocalDateTime;

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

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

//    @OneToOne(mappedBy = "estate", cascade = CascadeType.ALL, orphanRemoval = true)
//    private OuterAttributes outerAttributes;
//
//    @OneToOne(mappedBy = "estate", cascade = CascadeType.ALL, orphanRemoval = true)
//    private InsideAttributes insideAttributes;
//
//    public void setInsideAttributes(InsideAttributes insideAttributes) {
//        this.insideAttributes = insideAttributes;
//        insideAttributes.setEstate(this);
//    }
//
//    public void setOuterAttributes(OuterAttributes outerAttributes) {
//        this.outerAttributes = outerAttributes;
//        outerAttributes.setEstate(this);
//    }
}