package edu.invest.service

import edu.invest.dto.AssetDto
import edu.invest.exception.BackendException
import edu.invest.exception.CoreExceptionCode
import edu.invest.mapper.AssetMapper
import edu.invest.repository.AssetRepository
import edu.invest.util.AssetUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit
import java.util.concurrent.ConcurrentLinkedQueue

@Service
class AssetService @Autowired constructor(
        private val assetRepository: AssetRepository,
        private val assetMapper: AssetMapper,
        private val assetUtil: AssetUtil
) {

    val queue: ConcurrentLinkedQueue<String> = ConcurrentLinkedQueue()

    fun updateAndGetCurrentPrice(ticker: String): Double? {
        val assetOptionalFromDb = assetRepository.findByTicker(ticker)

        if (assetOptionalFromDb.isPresent) {
            val result = assetMapper.mapToDto(assetOptionalFromDb.get())

            val minutesPassed = ChronoUnit.MINUTES.between(result.lastTime, LocalDateTime.now())

            if (!queue.contains(ticker) && minutesPassed > 10) {
                queue.add(ticker)
            }
            return result.lastPrice
        } else if (assetOptionalFromDb.isEmpty && queue.isEmpty()) {
            return try {
                val price = assetUtil.getCurrentPrice(ticker)
                val assetDto = AssetDto(
                        ticker = ticker,
                        lastPrice = price,
                        lastTime = LocalDateTime.now())
                val asset = assetMapper.mapToEntity(assetDto)
                assetRepository.save(asset)
                price
            } catch (e: BackendException) {
                if (!queue.contains(ticker)) {
                    queue.add(ticker)
                }
                null
            }
        } else if (assetOptionalFromDb.isEmpty && queue.isNotEmpty()) {
            if (!queue.contains(ticker)) {
                queue.add(ticker)
            }
            return null
        } else {
            throw BackendException(CoreExceptionCode.WRONG_ASSET)
        }
    }
}