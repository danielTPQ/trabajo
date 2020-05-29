package com.is4tech.ngcourse.ngservices.person;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class PersonService {

    private final Logger logger = Logger.getLogger(getClass().getName());
    private final PersonRepository personRepository;

    public PersonService(
            PersonRepository personRepository
    ) {
        this.personRepository = personRepository;
    }

    @Transactional(readOnly = true)
    public Page<Person> findAll(Pageable pageable) {
        logger.log(Level.INFO, "Getting findall");
        return this.personRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Person findById(Long id) {
        logger.log(Level.INFO, "Getting personById");
        return this.personRepository.findById(id).orElse(null);
    }

    @Transactional
    public Person save(Person person) {
        logger.log(Level.INFO, "Executing save {0}", person);
        return this.personRepository.save(person);
    }

    @Transactional
    public void delete(Long id) {
        logger.log(Level.INFO, "Executing delete");
        this.personRepository.deleteById(id);
    }

}
