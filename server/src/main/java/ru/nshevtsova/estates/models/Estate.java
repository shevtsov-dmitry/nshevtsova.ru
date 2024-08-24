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
    private final LocalDateTime createdAt = LocalDateTime.now();

}