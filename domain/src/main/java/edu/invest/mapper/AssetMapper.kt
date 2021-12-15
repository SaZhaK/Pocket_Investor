package edu.invest.mapper

import edu.invest.dto.AssetDto
import edu.invest.entities.Asset
import org.springframework.stereotype.Component

@Component(value = "assetMapper")
class AssetMapper {
    fun mapToEntity(assetDto: AssetDto): Asset {
        return Asset(assetDto.id, assetDto.ticker, assetDto.lastPrice, assetDto.lastTime)
    }

    fun mapToDto(asset: Asset): AssetDto {
        return AssetDto(asset.id, asset.ticker, asset.lastPrice, asset.lastTime)
    }
}