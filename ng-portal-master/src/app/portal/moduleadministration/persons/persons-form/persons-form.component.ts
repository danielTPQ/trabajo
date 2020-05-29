import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EntityAction, EntityForm} from '../../../moduleshared/entity-form';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonsService} from '../persons.service';
import {Person} from '../person';
import swal from 'sweetalert';

@Component({
  selector: 'app-persons-form',
  templateUrl: './persons-form.component.html',
  styleUrls: ['./persons-form.component.scss']
})
export class PersonsFormComponent implements OnInit {

  entityForm: EntityForm;
  entity: Person;
  form: FormGroup;
  title: string;
  @Output() formEvent = new EventEmitter<Person>();

  constructor(
    private personService: PersonsService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl({value: '', disabled: true}),
      'name': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'salary': new FormControl('', [Validators.required]),
      'age': new FormControl('', [Validators.required]),
    });
  }

  load(entityForm: EntityForm) {
    this.entityForm = entityForm;
    this.entity = this.entityForm.entity;
    this.title = `Person Component - ${this.entityForm.action}`;
    if (this.form) {
      this.form.markAsUntouched();
      this.form.reset();
    }
    if (this.entityForm.action != EntityAction.NEW) {
      this.form.get('id').setValue(this.entity.id);
      this.form.get('name').setValue(this.entity.name);
      this.form.get('lastname').setValue(this.entity.lastname);
      this.form.get('salary').setValue(this.entity.salary);
      this.form.get('age').setValue(this.entity.age);
    }
  }

  onSubmit() {
    if (this.form.valid || this.form.disabled) {
      this.entity = {};
      this.entity.id = this.form.get('id').value;
      this.entity.name = this.form.get('name').value;
      this.entity.lastname = this.form.get('lastname').value
      this.entity.salary = this.form.get('salary').value;
      this.entity.age = this.form.get('age').value;
      if (this.entityForm.action === EntityAction.NEW) {
        this.personService.add(this.entity).subscribe(data => {
          swal('Agregado!', `${data.id} - ${data.name} ${data.lastname}`, 'success');
          // Emite evento para (persons.component)
          this.formEvent.emit(data);
        }, () => {
          swal('Error!', `Error al tratar de agregar ${this.entity.id} - ${this.entity.name} ${this.entity.lastname}`, 'error');
        });
      } else if (this.entityForm.action === EntityAction.EDIT) {
        this.personService.update(this.entity).subscribe(data => {
          swal('Actualizado!', `${data.id} - ${data.name} ${data.lastname}`, 'success');
          // Emite evento para (persons.component)
          this.formEvent.emit(data);
        }, () => {
          swal('Error!', `Error al tratar de actualizar ${this.entity.id} - ${this.entity.name} ${this.entity.lastname}`, 'error');
        });
      }
    }
  }

  resetForm() {
    this.entityForm = new EntityForm(EntityAction.NEW, {});
    this.load(this.entityForm);
    this.form.reset();
  }

}
