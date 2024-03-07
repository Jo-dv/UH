package org.project.uh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;


@SpringBootApplication()
public class UhApplication {

	public static void main(String[] args) {
		SpringApplication.run(UhApplication.class, args);
	}

}
