package edu.invest.mapper

import edu.invest.dto.UserDto
import edu.invest.entities.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component(value = "userMapper")
class UserMapper @Autowired constructor(
        private val portfolioMapper: PortfolioMapper
) {
    fun mapToEntity(userDto: UserDto): User {
        val portfolio = userDto.portfolio?.let { portfolioMapper.mapToEntity(userDto.portfolio!!) }
        return User(
                userDto.id,
                userDto.name,
                userDto.surname,
                userDto.age,
                userDto.gender,
                userDto.education,
                userDto.qualifiedInvestorStatus,
                userDto.registrationDate,
                portfolio,
                userDto.githubLogin)
    }

    fun mapToDto(user: User): UserDto {
        val portfolioDto = user.portfolio?.let { portfolioMapper.mapToDto(user.portfolio!!) }
        return UserDto(
                user.id,
                user.name,
                user.surname,
                user.age,
                user.gender,
                user.education,
                user.qualifiedInvestorStatus,
                user.registrationDate,
                portfolioDto,
                user.githubLogin)
    }
}