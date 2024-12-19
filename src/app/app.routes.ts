import { Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PersonasComponent } from './personas/personas.component';

export const routes: Routes = [
    {
        path: '',
        component: PersonasComponent,
        children: [
          
        ]
    }
];
