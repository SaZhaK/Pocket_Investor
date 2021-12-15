package edu.invest.scheduler

import edu.invest.exception.BackendException
import edu.invest.repository.AssetRepository
import edu.invest.service.AssetService
import edu.invest.util.AssetUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class AssetScheduler @Autowired constructor(
        private val assetService: AssetService,
        private val assetUtil: AssetUtil,
        private val assetRepository: AssetRepository
) {

    @Scheduled(fixedRate = 60000)
    fun checkAvailableClients() {
        val queue = assetService.queue

        var idx = 0
        while (queue.isNotEmpty() && idx++ < 8) {
            try {
                val ticker = queue.remove()
                val currentPrice = assetUtil.getCurrentPrice(ticker)
                val asset = assetRepository.findByTicker(ticker).get()
                asset.lastPrice = currentPrice
                asset.lastTime = LocalDateTime.now()
                assetRepository.save(asset)
            } catch (e: BackendException) {
                break
            }
        }
    }
}