package edu.invest.service

import edu.invest.dto.PortfolioDto
import edu.invest.entities.Portfolio
import edu.invest.mapper.PortfolioMapper
import edu.invest.mapper.TradeMapper
import edu.invest.mapper.UserMapper
import edu.invest.repository.PortfolioRepository
import edu.invest.util.PortfolioUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class PortfolioService @Autowired constructor(
        private val userService: UserService,
        private val userMapper: UserMapper,
        private val portfolioRepository: PortfolioRepository,
        private val portfolioMapper: PortfolioMapper,
        private val tradeService: TradeService,
        private val tradeMapper: TradeMapper,
        private val portfolioUtil: PortfolioUtil
) {
    fun update(userId: Long, portfolioDto: PortfolioDto): PortfolioDto {
        var ownerDto = userService.findById(userId)
        val owner = userMapper.mapToEntity(ownerDto)

        val portfolio = portfolioMapper.mapToEntity(portfolioDto)
        val trades = portfolio.trades
        val savedTrades = trades
                ?.map { tradeMapper.mapToDto(it) }
                ?.map { tradeService.save(it) }
                ?.map { tradeMapper.mapToEntity(it) }
        portfolio.trades = savedTrades

        portfolio.id = owner.portfolio!!.id
        val savedPortfolio = portfolioRepository.save(portfolio)

        owner.portfolio = savedPortfolio
        ownerDto = userMapper.mapToDto(owner)
        userService.update(userId, ownerDto)

        return portfolioMapper.mapToDto(savedPortfolio)
    }

    fun findByUserId(userId: Long): PortfolioDto {
        val ownerDto = userService.findById(userId)
        if (ownerDto.portfolio == null) {
            val savedPortfolio = portfolioRepository.save(Portfolio(trades = emptyList()))
            ownerDto.portfolio = portfolioMapper.mapToDto(savedPortfolio)
            userService.saveUser(ownerDto)
        }
        return ownerDto.portfolio!!
    }

    fun findAll(): List<PortfolioDto> {
        return portfolioRepository.findAll()
                .map { portfolioMapper.mapToDto(it!!) }
                .map {
                    portfolioUtil.countPortfolioSummary(it)
                    it
                }
                .toList()
    }
}