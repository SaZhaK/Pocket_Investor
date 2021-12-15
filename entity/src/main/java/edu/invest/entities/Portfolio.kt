package edu.invest.entities

import lombok.EqualsAndHashCode
import javax.persistence.*

@Entity(name = "portfolio")
@Table(name = "portfolio")
@EqualsAndHashCode(callSuper = false)
class Portfolio constructor(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @OneToMany var trades: List<Trade>? = null
)