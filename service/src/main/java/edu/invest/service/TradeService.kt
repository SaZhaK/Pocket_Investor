package edu.invest.service

import edu.invest.dto.TradeDto
import edu.invest.mapper.TradeMapper
import edu.invest.repository.AssetRepository
import edu.invest.repository.TradeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TradeService @Autowired constructor(
        private val tradeMapper: TradeMapper,
        private val tradeRepository: TradeRepository,
        private val assetRepository: AssetRepository
) {

    fun save(tradeDto: TradeDto): TradeDto {
        val trade = tradeMapper.mapToEntity(tradeDto)

        val assetOptional = assetRepository.findByTicker(trade.asset!!.ticker!!)
        if (assetOptional.isEmpty()) {
            assetRepository.save(trade.asset!!)
        } else {
            trade.asset = assetOptional.get()
        }

        val savedTrade = tradeRepository.save(trade)
        return tradeMapper.mapToDto(savedTrade)
    }
}