package com.scoot.todolist;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.QueryLookupStrategy.Key;

import jakarta.persistence.EntityManagerFactory;

@Configurable
@EnableJpaRepositories(basePackages = "com.acme.repositories",
    includeFilters = { @Filter(type = FilterType.REGEX, pattern = ".*SomeRepository") },
    excludeFilters = { @Filter(type = FilterType.REGEX, pattern = ".*SomeOtherRepository") },
    queryLookupStrategy = Key.CREATE_IF_NOT_FOUND)
public class ApplicationConfiguration {
	@Bean
	EntityManagerFactory entityManagerFactory() {
		return null;
		
	}
}
