package ru.nshevtsova.realtor_certificates;

import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.util.FastByteArrayOutputStream;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class CertificateService {

    private final CertificateRepo repo;

    public CertificateService(CertificateRepo repo) {
        this.repo = repo;
    }

    public Integer save(MultipartFile certificateImage) throws Exception {
        try (var compressedImageStream = new FastByteArrayOutputStream()) {
            Thumbnails.of(certificateImage.getInputStream())
                    .scale(0.9)
                    .toOutputStream(compressedImageStream);
            Certificate cert = new Certificate(certificateImage.getOriginalFilename(), compressedImageStream.toByteArray());
            return repo.save(cert).getId();
        }
    }

    public void deleteCertificateById(int id) throws IllegalArgumentException {
        repo.deleteById(id);
    }

    public List<Certificate> getAll() {
        return repo.findAll();
    }

    public Optional<Certificate> getById(int id) {
        return repo.findById(id);
    }
}
