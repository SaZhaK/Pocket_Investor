package edu.invest.dto

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
class AssetDto @JsonCreator constructor(
        @JsonProperty(value = "id") val id: Long? = null,
        @JsonProperty(value = "ticker") val ticker: String? = null,
        @JsonProperty(value = "lastPrice") val lastPrice: Double? = null,
        @JsonProperty(value = "lastTime") val lastTime: LocalDateTime? = null
)