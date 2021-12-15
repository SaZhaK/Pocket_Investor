package edu.invest.excpetion;

import edu.invest.exception.BackendExceptionDto;
import edu.invest.exception.BackendException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ControllerExceptionHandler {

	@ExceptionHandler(BackendException.class)
	public ResponseEntity<BackendExceptionDto> handleBusinessException(BackendException exception) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).
				body(new BackendExceptionDto(
						LocalDateTime.now(),
						exception.getCode(),
						exception.getMessage()));
	}
}
