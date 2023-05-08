import { getAllPokemons, getPokemonRegions } from '$lib/api/pokemonApi';
import type { PageLoad } from './$types';

export const load = (async () => {
	let pokemonList = [];
	let regionsList = [];
	let regionComboboxOptions = [];

	pokemonList = await getAllPokemons();
	regionsList = await getPokemonRegions();
	regionsList.unshift({ name: '- All - ', id: '0', url: '/' });

	regionComboboxOptions = regionsList.map((region) => {
		return { name: region.name, value: region.name, id: region.id };
	});

	return {
		pokemonList,
		regionsList,
		regionComboboxOptions
	};
}) satisfies PageLoad;
