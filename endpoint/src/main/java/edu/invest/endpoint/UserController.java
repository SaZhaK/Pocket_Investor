package edu.invest.endpoint;

import edu.invest.dto.UserDto;
import edu.invest.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(allowedHeaders = "*")
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
	private final UserService userService;

	@PostMapping
	public UserDto saveUser(@RequestBody UserDto userDto) {
		return userService.saveUser(userDto);
	}

	@GetMapping("my/{userId}")
	public UserDto getMyUserById(@PathVariable("userId") Long userId) {
		return userService.findById(userId);
	}

	@GetMapping("all/{userId}")
	public UserDto getAllUserById(@PathVariable("userId") Long userId) {
		return userService.findById(userId);
	}

	@GetMapping("all")
	public List<UserDto> getAll() {
		return userService.findAll();
	}

	@PutMapping("my/{userId}")
	public UserDto updateUser(@PathVariable("userId") Long userId,
							  @RequestBody UserDto userDto) {
		return userService.update(userId, userDto);
	}

	@DeleteMapping("my/{userId}")
	public UserDto deleteUser(@PathVariable("userId") Long userId) {
		return userService.remove(userId);
	}
}
