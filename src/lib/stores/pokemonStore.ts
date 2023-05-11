import type { IndexPokemon } from '$lib/types/pokemon';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const randomPokemonListGenerated: Writable<IndexPokemon[]> = localStorageStore(
	'pokemonList',
	[]
);
