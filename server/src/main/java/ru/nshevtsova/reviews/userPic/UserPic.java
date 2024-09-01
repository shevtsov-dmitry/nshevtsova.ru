package ru.nshevtsova.reviews.userPic;

import org.springframework.web.multipart.MultipartFile;

/**
 * UserPic
 */
public record UserPic(Long reviewId, MultipartFile userPic) {
}
