package com.is4tech.ngcourse.ngservices.person;

import java.math.BigDecimal;
import java.util.Objects;

public class PersonDTO {

    private Long id;
    private String name;
    private String lastname;
    private BigDecimal salary;
    private int age;

    public PersonDTO() {
        super();
    }

    public PersonDTO(Long id, String name, String lastname, BigDecimal salary, int age) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.salary = salary;
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PersonDTO personDTO = (PersonDTO) o;
        return age == personDTO.age &&
                Objects.equals(id, personDTO.id) &&
                Objects.equals(name, personDTO.name) &&
                Objects.equals(lastname, personDTO.lastname) &&
                Objects.equals(salary, personDTO.salary);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, lastname, salary, age);
    }
    
}
