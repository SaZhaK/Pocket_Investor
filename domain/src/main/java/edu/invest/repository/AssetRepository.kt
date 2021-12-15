package edu.invest.repository

import edu.invest.entities.Asset
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AssetRepository : JpaRepository<Asset?, Long?> {

    fun findByTicker(ticker: String): Optional<Asset>
}