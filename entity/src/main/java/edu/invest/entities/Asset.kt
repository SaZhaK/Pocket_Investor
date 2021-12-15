package edu.invest.entities

import lombok.EqualsAndHashCode
import java.time.LocalDateTime
import javax.persistence.*

@Entity(name = "asset")
@Table(name = "asset")
@EqualsAndHashCode(callSuper = false)
class Asset constructor(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null,
        @Column(name = "ticker") val ticker: String? = null,
        @Column(name = "last_price") var lastPrice: Double? = null,
        @Column(name = "last_time") var lastTime: LocalDateTime? = null
)