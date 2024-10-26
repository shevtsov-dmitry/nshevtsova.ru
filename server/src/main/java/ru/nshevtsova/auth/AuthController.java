package ru.nshevtsova.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthController
 */
@RestController
@RequestMapping("/admin")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	protected record Credentials(String username, String password) {
	};

	@PostMapping("/login")
	public ResponseEntity<Void> verifyIfAdmin(@RequestBody(required = true) Credentials credentials) {
		return authService.verifyIfAdmin(credentials) ? new ResponseEntity<>(HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

}
