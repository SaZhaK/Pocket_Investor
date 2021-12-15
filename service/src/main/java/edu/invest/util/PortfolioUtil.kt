package edu.invest.util

import edu.invest.dto.PortfolioDto
import edu.invest.service.AssetService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class PortfolioUtil @Autowired constructor(
        private val assetService: AssetService
) {
    fun countPortfolioSummary(portfolioDto: PortfolioDto) {
        val trades = portfolioDto.trades!!

        var totalInvested = 0.0
        var totalCost = 0.0
        for (trade in trades) {
            val asset = trade.asset!!
            val ticker = asset.ticker!!
            val amount = trade.amount!!
            val currentCost = (assetService.updateAndGetCurrentPrice(ticker) ?: 0.0) * amount

            totalInvested += trade.price!! * amount
            totalCost += currentCost
        }

        val delta = totalCost - totalInvested
        val deltaPercentage = delta / totalInvested * 100

        portfolioDto.totalCost = totalCost
        portfolioDto.delta = delta
        portfolioDto.deltaPercentage = deltaPercentage
    }
}