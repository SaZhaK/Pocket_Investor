package edu.invest.entities

import edu.invest.enums.Gender
import lombok.EqualsAndHashCode
import java.time.LocalDate
import javax.persistence.*

@Entity(name = "users")
@Table(name = "users")
@EqualsAndHashCode(callSuper = false)
class User constructor(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long? = null,
        @Column(name = "name") var name: String? = null,
        @Column(name = "surname") var surname: String? = null,
        @Column(name = "age") var age: Int? = null,
        @Enumerated(EnumType.ORDINAL) var gender: Gender? = null,
        @Column(name = "education") var education: String? = null,
        @Column(name = "qualified_investor_status") var qualifiedInvestorStatus: Boolean? = null,
        @Column(name = "registration_date") var registrationDate: LocalDate? = null,
        @OneToOne var portfolio: Portfolio? = null,
        @Column(name = "github_login") val githubLogin: String? = null,
)