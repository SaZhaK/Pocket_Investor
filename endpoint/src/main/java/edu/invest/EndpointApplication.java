package edu.invest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;


@EntityScan(basePackages = {"edu.invest.entities"})
@EnableJpaRepositories(basePackages = "edu.invest.repository")
@EnableJpaAuditing
@ComponentScan(basePackages = {"edu.invest.*"})
@EnableScheduling
@SpringBootApplication
public class EndpointApplication {
	public static void main(String[] args) {
		SpringApplication.run(EndpointApplication.class, args);
	}
}
