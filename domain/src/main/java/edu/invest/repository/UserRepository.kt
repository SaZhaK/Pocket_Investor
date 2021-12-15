package edu.invest.repository

import edu.invest.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<User?, Long?> {

    @Query(value = "SELECT * FROM users u WHERE u.github_login = :login", nativeQuery = true)
    fun findByGithubLogin(@Param("login") login: String): Optional<User>
}