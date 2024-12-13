import { Component, HostListener } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css'
})
export class PokemonsComponent {
  pokemons: any[] = [];
  isFlipped: { [key: string]: boolean } = {};
  pokemonDetails: { [key: string]: any } = {};
  isLoading: boolean = false; // Para evitar múltiples solicitudes simultáneas
  limit: number = 50; // Cuántos Pokémon cargar por solicitud
  offset: number = 0;
  personas: any[] = [];

  constructor(private pokemonService: PokeapiService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  flipCard(pokemonName: any): void {
    if (!this.isFlipped[pokemonName.name]) {
      this.isFlipped[pokemonName.name] = true;
      
      // Hacer la llamada a la API para obtener detalles del Pokémon
      this.getPokemonDetails(pokemonName.name);
    } else {
      this.isFlipped[pokemonName.name] = false;
    }
  }

  getPokemonDetails(pokemonName: string): void {
    this.pokemonService.getPokeInfo(pokemonName).subscribe(response => {
      this.pokemonDetails[pokemonName] = {
        type: response.types.map((t: any) => t.type.name).join(', '),
        weight: response.weight / 10, // Peso en kilogramos
        abilities: response.abilities.map((a: any) => a.ability.name)
      };
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Si el usuario está cerca del final de la página, cargar más Pokémon
    if (scrollPosition >= documentHeight - 200) {
      this.loadPokemons();
    }
  }

  loadPokemons(): void {
    
    if (this.isLoading) return; // Evitar solicitudes simultáneas
    this.isLoading = true;
    const remaining = 151 - this.pokemons.length; // Calcular cuántos Pokémon faltan
  
    if(remaining !== 0){
      this.pokemonService.getPokemons(this.limit, this.offset).subscribe((response: any) => {
        
        if (remaining > 0) {
          const resultsToAdd = response.results.slice(0, remaining); // Tomar solo los necesarios
          this.pokemons = [...this.pokemons, ...resultsToAdd]; // Agregar los Pokémon nuevos
          this.offset += this.limit;
        }
    
        // Detener la carga si ya se alcanzaron los 151 Pokémon
        this.isLoading = false;
      });
    }
  }

  obtenerNumeroPokedex(numero: any): string {
    return (Number(numero) + 1).toString().padStart(3, '0');
  }

  traerPersonas(){
    this.pokemonService.getPersonas().subscribe(value => {
      console.log(value)
      this.personas = value
    })
  }
}
