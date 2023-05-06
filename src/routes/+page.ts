import { getPokemonRegions, getPokemonsByRegion } from '$lib/api/pokemonApi';
import type { PageLoad } from './$types';

export const load = (async () => {
	let pokemonList = [];
	let regionsList = [];
	let regionComboboxOptions = [];

	pokemonList = await getPokemonsByRegion('1');
	regionsList = await getPokemonRegions();

	regionComboboxOptions = regionsList.map((region) => {
		return { name: region.name, value: region.name, id: region.id };
	});

	return {
		pokemonList,
		regionsList,
		regionComboboxOptions
	};
}) satisfies PageLoad;
