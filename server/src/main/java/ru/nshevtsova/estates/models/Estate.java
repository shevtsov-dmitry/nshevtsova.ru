package ru.nshevtsova.estates.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ru.nshevtsova.estates.enums.EstateType;

@Entity
@NoArgsConstructor
@Data
@ToString
public class Estate {

    // TODO make an annotation - return field name and 400 code if field is null
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int price;
    private String address;
    private EstateType estateType;

    @CreatedDate
    @Column(updatable = false)
    private final LocalDateTime createdAt = LocalDateTime.now();

    // @Transient
    // @JsonIgnore
    // private String imageStoragePath;
    //
    // public void setImageStoragePath(Long id) {
    // imageStoragePath = "images/estates/" + id;
    // this.imageStoragePath = imageStoragePath;
    // new File(imageStoragePath).mkdirs();
    // }

    // public void setPreviewImage(byte[] previewImage) throws IOException {
    // String pathStr = "images/storage/" + id;
    // File directory = new File(pathStr);
    // if (!directory.exists()) {
    // directory.mkdirs();
    // }
    // File file = new File(directory, id + ".png");
    // Files.write(Path.of(file.getPath()), previewImage);
    // }
    //
    // public byte[] getPreviewImage() {
    // final String noImageBase64 =
    // "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAnXAAAJ1wGxbhe3AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAActJREFUOI2dkD1oU2EUhp/33iLFSdHhVprYtLaL0tyquOQKzR0sDgp2s4MuXcSldqyLgyIu16C4qHv9w8WtQyKSQAXBqPiXClUKGkGUYAsdmnscoiGWEEKf5cCB9/m+87p+kC14icGd1ZXlRbaA6yWHdiCue4lUbSsSAfiZ8A5iGuNCuZTPjQbhCQd6Owet8rJYeOUeDLKHkI4BjxGXvUSqZuIXpgOIVcFGe4HO9yUHPvbEaBC4Vy7mH/qZ8AcicmEudmwPxlS8vefw64WFtc0CPwgBjTity3IpnwMeGVwldipCz7RWP9LpFGfzQqLQmHGE2ft11l/4QfgmHYSnuhLs83bdBs0IniCiXrZNG/ZccD+dyU52FIyOj/d/qv68WC4evRnXOWfwXVKE8Ra4K+nBWBCebs24XjK1H2D3wPBvt25PgUkv8WWv47ABnAEkacLM5iV9Bq70JVNLQNwUmKzfNbsFDDWKwEe2CvoGDDc60YSZM4/ir6BLfwUfHACZrjXD/zCdBY7/X3DcPAeYAnCEVQC3XcPtkBSZOUuGbpjZOwGMBdm0oZEuHWlgDmO2XMrn1O3LrfiZcAYRYcx2/fVWqivLi14iVUOc/AMfcZzdCK3KYgAAAABJRU5ErkJggg==";
    // try {
    // final var resource = new
    // ClassPathResource("images/estates/%d_preview.%s".formatted(id, new
    // String("png")));
    // return StreamUtils.copyToByteArray(resource.getInputStream());
    // } catch (IOException e) {
    // return noImageBase64.getBytes();
    // }
    // }

}
