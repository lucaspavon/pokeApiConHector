import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokeInfo(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${nombre}`);
  }

  getPersonas(nombre : string): Observable<any>{
    return this.http.get('https://retoolapi.dev/dWnc0l/usuarios' + '?Nombre=' + nombre);
  }
}
