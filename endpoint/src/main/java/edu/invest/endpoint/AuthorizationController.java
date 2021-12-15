package edu.invest.endpoint;

import edu.invest.dto.UserDto;
import edu.invest.exception.BackendException;
import edu.invest.exception.CoreExceptionCode;
import edu.invest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/home")
@AllArgsConstructor
public class AuthorizationController {

	private final UserService userService;

	@GetMapping
	public Long getUserId(@AuthenticationPrincipal(expression = "attributes['login']") String login) {
		UserDto userDto;
		try {
			userDto = userService.findByGithubLogin(login);
		} catch (BackendException e) {
			if (e.getCode() == CoreExceptionCode.NOT_FOUND) {
				UserDto newUser = new UserDto();
				newUser.setGithubLogin(login);
				userDto = userService.saveUser(newUser);
			} else {
				throw e;
			}
		}
		return userDto.getId();
	}
}
