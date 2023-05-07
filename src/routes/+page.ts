import { getPokemonRegions, getPokemonsByRegion } from '$lib/api/pokemonApi';
import { selectedRegion } from '$lib/stores/pokemonStore';
import type { PageLoad } from './$types';

export const load = (async () => {
	let pokemonList = [];
	let regionsList = [];
	let regionComboboxOptions = [];

	let selectedRegionId;

	selectedRegion.subscribe((value) => {
		selectedRegionId = value;
	});

	pokemonList = await getPokemonsByRegion(selectedRegionId || '1');
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
