package edu.invest.dto

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
class TradeDto @JsonCreator constructor(
        @JsonProperty(value = "id") val id: Long? = null,
        @JsonProperty(value = "asset") val asset: AssetDto? = null,
        @JsonProperty(value = "amount") val amount: Int? = null,
        @JsonProperty(value = "price") val price: Double? = null,
)