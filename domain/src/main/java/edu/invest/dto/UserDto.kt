package edu.invest.dto

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import edu.invest.enums.Gender
import java.time.LocalDate

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
class UserDto @JsonCreator constructor(
        @JsonProperty(value = "id") val id: Long? = null,
        @JsonProperty(value = "name") var name: String? = null,
        @JsonProperty(value = "surname") var surname: String? = null,
        @JsonProperty(value = "age") var age: Int? = null,
        @JsonProperty(value = "gender") var gender: Gender? = null,
        @JsonProperty(value = "education") var education: String? = null,
        @JsonProperty(value = "qualifiedInvestorStatus") var qualifiedInvestorStatus: Boolean? = null,
        @JsonProperty(value = "registrationDate") val registrationDate: LocalDate? = null,
        @JsonProperty(value = "portfolio") var portfolio: PortfolioDto? = null,
        @JsonProperty(value = "githubLogin") var githubLogin: String? = null
)