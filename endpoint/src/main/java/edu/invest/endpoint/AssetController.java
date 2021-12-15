package edu.invest.endpoint;

import edu.invest.dto.AssetResponseDto;
import edu.invest.service.AssetService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/asset")
@AllArgsConstructor
public class AssetController {

	private final AssetService assetService;

	@GetMapping("price/{ticker}")
	public AssetResponseDto getRealTimePrice(@PathVariable("ticker") String ticker) {
		Double price = assetService.updateAndGetCurrentPrice(ticker);
		return new AssetResponseDto(price);
	}
}
