package ru.nshevtsova.reviews.userpic;

import org.springframework.web.multipart.MultipartFile;

/**
 * UserPic
 */
public record UserPic(Long reviewId, MultipartFile userPic) {
}
