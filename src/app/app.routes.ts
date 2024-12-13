import { Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';

export const routes: Routes = [
    {
        path: '',
        component: PokemonsComponent,
        children: [
          
        ]
    }
];
