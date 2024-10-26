package ru.nshevtsova.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import ru.nshevtsova.auth.AuthController.Credentials;

/**
* AuthService
*/
@Service
public class AuthService {
	@Value("${ADMIN_LOGIN}")
	private String HARDCODED_LOGIN;
	@Value("${ADMIN_PASSWORD}")
	private String HARDCODED_PASSWORD;

    public boolean verifyIfAdmin(Credentials credentials) {
    	return credentials.username().equals(HARDCODED_LOGIN) &&
     		   credentials.password().equals(HARDCODED_PASSWORD);
    }

}
