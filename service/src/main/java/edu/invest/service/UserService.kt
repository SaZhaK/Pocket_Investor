package edu.invest.service

import edu.invest.dto.UserDto
import edu.invest.entities.Portfolio
import edu.invest.exception.BackendException
import edu.invest.exception.CoreExceptionCode
import edu.invest.mapper.UserMapper
import edu.invest.repository.PortfolioRepository
import edu.invest.repository.UserRepository
import edu.invest.util.PortfolioUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class UserService @Autowired constructor(
        private val userRepository: UserRepository,
        private val userMapper: UserMapper,
        private val portfolioRepository: PortfolioRepository,
        private val portfolioUtil: PortfolioUtil
) {

    fun saveUser(userDto: UserDto): UserDto {
        val portfolio = Portfolio()
        val savedPortfolio = portfolioRepository.save(portfolio)

        val user = userMapper.mapToEntity(userDto)
        user.registrationDate = LocalDate.now()
        user.portfolio = savedPortfolio

        val savedUser = userRepository.save(user)
        return userMapper.mapToDto(savedUser)
    }

    fun findById(id: Long): UserDto {
        val user = userRepository.findById(id).orElseThrow { BackendException(CoreExceptionCode.NOT_FOUND) }!!
        return userMapper.mapToDto(user)
    }

    fun findAll(): List<UserDto> {
        return userRepository.findAll()
                .map { userMapper.mapToDto(it!!) }
                .map {
                    portfolioUtil.countPortfolioSummary(it.portfolio!!)
                    it
                }
                .toList()
    }

    fun findByGithubLogin(login: String): UserDto {
        val user = userRepository.findByGithubLogin(login).orElseThrow { BackendException(CoreExceptionCode.NOT_FOUND) }!!
        return userMapper.mapToDto(user)
    }

    fun update(id: Long, userDto: UserDto): UserDto {
        val oldUser = userRepository.findById(id).orElseThrow { BackendException(CoreExceptionCode.NOT_FOUND) }!!

        oldUser.name = userDto.name
        oldUser.surname = userDto.surname
        oldUser.age = userDto.age
        oldUser.gender = userDto.gender
        oldUser.education = userDto.education
        oldUser.qualifiedInvestorStatus = userDto.qualifiedInvestorStatus

        userRepository.save(oldUser)

        return userMapper.mapToDto(oldUser)
    }

    fun remove(id: Long): UserDto {
        val userToDelete = userRepository.findById(id).orElseThrow { BackendException(CoreExceptionCode.NOT_FOUND) }!!
        userRepository.delete(userToDelete)
        return userMapper.mapToDto(userToDelete)
    }
}