package edu.invest.dto

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
class PortfolioDto @JsonCreator constructor(
        @JsonProperty(value = "id") val id: Long? = null,
        @JsonProperty(value = "totalCost") var totalCost: Double? = null,
        @JsonProperty(value = "delta") var delta: Double? = null,
        @JsonProperty(value = "deltaPercentage") var deltaPercentage: Double? = null,
        @JsonProperty(value = "trades") val trades: List<TradeDto>? = null
)