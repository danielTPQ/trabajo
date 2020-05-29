package com.is4tech.ngcourse.ngservices.person;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    private final PersonService personService;

    public PersonController(
            PersonService personService
    ) {
        this.personService = personService;
    }

    @GetMapping
    public ResponseEntity<Page<Person>> findAll(Pageable pageable) {
        Page<Person> list = this.personService.findAll(pageable);
        return list.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Person> findById(@PathVariable("id") Long id) {
        Person person = this.personService.findById(id);
        return person == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(person);
    }

    @PostMapping
    public ResponseEntity<Person> add(@RequestBody PersonDTO personDTO) {
        Person person = new Person();
        BeanUtils.copyProperties(personDTO, person);
        person = this.personService.save(person);
        return person == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(person);
    }

    @PutMapping
    public ResponseEntity<Person> update(@RequestBody PersonDTO personDTO) {
        Person person = this.personService.findById(personDTO.getId());
        if (person != null) {
            BeanUtils.copyProperties(personDTO, person);
            person = this.personService.save(person);

        }
        return person == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(person);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        this.personService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
