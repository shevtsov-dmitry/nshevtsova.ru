package ru.nshevtsova.realtor_certificates;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String filename;
    @Lob
    private byte[] content;

    public Certificate(String filename, byte[] content) {
        this.filename = filename;
        this.content = content;
    }

}
