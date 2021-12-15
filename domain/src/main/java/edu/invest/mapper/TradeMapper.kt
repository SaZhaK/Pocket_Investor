package edu.invest.mapper

import edu.invest.dto.TradeDto
import edu.invest.entities.Trade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component


@Component(value = "tradeMapper")
class TradeMapper @Autowired constructor(
        private val assetMapper: AssetMapper
) {
    fun mapToEntity(tradeDto: TradeDto): Trade {
        val asset = assetMapper.mapToEntity(tradeDto.asset!!)
        return Trade(tradeDto.id, asset, tradeDto.amount, tradeDto.price)
    }

    fun mapToDto(trade: Trade): TradeDto {
        val assetDto = assetMapper.mapToDto(trade.asset!!)
        return TradeDto(trade.id, assetDto, trade.amount, trade.price)
    }
}