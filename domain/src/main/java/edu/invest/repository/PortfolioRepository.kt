package edu.invest.repository

import edu.invest.entities.Portfolio
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PortfolioRepository : JpaRepository<Portfolio?, Long?>