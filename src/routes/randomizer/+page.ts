import { getPokemonRegions } from '$lib/api/pokemonApi';
import type { PageLoad } from './$types';

export const load = (async () => {
	let regionsList = [];
	let regionComboboxOptions = [];

	regionsList = await getPokemonRegions();

	regionComboboxOptions = regionsList.map((region) => {
		return { name: region.name, value: region.name, id: region.id };
	});

	return {
		regionsList,
		regionComboboxOptions
	};
}) satisfies PageLoad;
