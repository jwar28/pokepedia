import type { IndexPokemon } from '$lib/types/pokemon';
import { writable, type Writable } from 'svelte/store';

export const randomPokemonListGenerated: Writable<IndexPokemon[]> = writable();
