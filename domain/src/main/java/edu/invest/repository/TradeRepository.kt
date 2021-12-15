package edu.invest.repository

import edu.invest.entities.Trade
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TradeRepository : JpaRepository<Trade?, Long?>