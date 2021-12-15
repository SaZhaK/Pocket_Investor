package edu.invest.dto

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
class CurrencyDto @JsonCreator constructor(
        @JsonProperty(value = "id") val id: Long? = null,
        @param:JsonProperty(value = "name") val name: String? = null
)