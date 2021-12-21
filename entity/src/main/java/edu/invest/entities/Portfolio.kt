package edu.invest.entities

import lombok.EqualsAndHashCode
import javax.persistence.*

@Entity(name = "portfolio")
@Table(name = "portfolio")
@EqualsAndHashCode(callSuper = false)
class Portfolio constructor(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @Column(name = "total_cost") var totalCost: Double? = null,
        @Column(name = "delta") var delta: Double? = null,
        @Column(name = "delta_percentage") var deltaPercentage: Double? = null,
        @OneToMany var trades: List<Trade>? = null
)