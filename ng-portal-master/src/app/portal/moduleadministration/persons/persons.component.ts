import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PersonsService} from './persons.service';
import {Person} from './person';
import {EntityAction, EntityForm} from '../../moduleshared/entity-form';
import {PersonsFormComponent} from './persons-form/persons-form.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'lastname', 'salary', 'age', 'action'];
  dataSource = new MatTableDataSource<Person>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('personsFormComponent', {static: true}) personsFormComponent: PersonsFormComponent;

  entityForm: EntityForm;
  actions = EntityAction;

  constructor(
    private personService: PersonsService,
  ) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.load();
  }

  load() {
    // Recupera listado de personas a traves de servicio
    this.personService.query().subscribe((data: any) => {
      this.dataSource = data.content;
    });
    // Carga formulario en modo NEW
    this.entityForm = new EntityForm(this.actions.NEW, {});
    this.personsFormComponent.load(this.entityForm);
  }

  formElement(action: EntityAction, person: Person) {
    if (action === EntityAction.EDIT) {
      this.entityForm.action = action;
      this.entityForm.entity = person;
      this.personsFormComponent.load(this.entityForm);
    } else if (action === EntityAction.DELETE) {
      this.personService.delete(person.id).subscribe(() => {
        swal('Eliminado!', `${person.id} - ${person.name} ${person.lastname}`, 'success');
        this.load();
      });
    }
  }

}
