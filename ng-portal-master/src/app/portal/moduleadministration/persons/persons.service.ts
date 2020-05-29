import {Injectable} from '@angular/core';
import {API_URL} from '../../../shared/constants'
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Person} from "./person";

@Injectable()
export class PersonsService {

  url = `${API_URL}/persons`;

  constructor(private http: HttpClient) {}

  query(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  find(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.url}/${id}`);
  }

  add(person: Person): Observable<Person> {
    return this.http.post<Person>(this.url, person);
  }

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(this.url, person);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
