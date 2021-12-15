package edu.invest.mapper

import edu.invest.dto.PortfolioDto
import edu.invest.entities.Portfolio
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component(value = "portfolioMapper")
class PortfolioMapper @Autowired constructor(
        private val tradeMapper: TradeMapper,
) {
    fun mapToEntity(portfolioDto: PortfolioDto): Portfolio {
        val trades = portfolioDto.trades?.map(tradeMapper::mapToEntity)?.toList()
        return Portfolio(portfolioDto.id, trades)
    }

    fun mapToDto(portfolio: Portfolio): PortfolioDto {
        val trades = portfolio.trades?.map(tradeMapper::mapToDto)?.toList()
        return PortfolioDto(portfolio.id, trades = trades)
    }
}