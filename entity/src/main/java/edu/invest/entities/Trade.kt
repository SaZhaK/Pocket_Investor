package edu.invest.entities

import lombok.EqualsAndHashCode
import javax.persistence.*

@Entity(name = "trade")
@Table(name = "trade")
@EqualsAndHashCode(callSuper = false)
class Trade constructor(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null,
        @OneToOne var asset: Asset? = null,
        @Column(name = "amount") val amount: Int? = null,
        @Column(name = "price") val price: Double? = null
)