package ru.nshevtsova.realtor_certificates;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
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
        return repo.save(new Certificate(certificateImage.getOriginalFilename(), certificateImage.getBytes())).getId();
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
