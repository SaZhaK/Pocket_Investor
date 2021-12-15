package edu.invest.endpoint;

import edu.invest.dto.PortfolioDto;
import edu.invest.service.PortfolioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(allowedHeaders = "*")
@RestController
@RequestMapping("/portfolio")
@AllArgsConstructor
public class PortfolioController {
	private final PortfolioService portfolioService;

//	@GetMapping(value = "{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
//	public List<TradeDto> getUserTrades(@PathVariable("userId") Long userId) {
//		UserDto user = userService.findById(userId);
//		PortfolioDto portfolio = user.getPortfolio();
//		List<TradeDto> trades = new ArrayList<>();
//		if (portfolio != null) {
//			trades = portfolio.getTrades();
//		}
//		return trades;
//	}

	@PutMapping("my/{userId}")
	public PortfolioDto updatePortfolio(@PathVariable("userId") Long userId,
										@RequestBody PortfolioDto portfolioDto) {
		return portfolioService.update(userId, portfolioDto);
	}

	@GetMapping("my/{userId}")
	public PortfolioDto getMyByUserId(@PathVariable("userId") Long userId) {
		return portfolioService.findByUserId(userId);
	}

	@GetMapping("all/{userId}")
	public PortfolioDto getAllByUserId(@PathVariable("userId") Long userId) {
		return portfolioService.findByUserId(userId);
	}

	@GetMapping("all")
	public List<PortfolioDto> getAll() {
		return portfolioService.findAll();
	}
}
