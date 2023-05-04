import type { PageLoad } from './$types';
import type { Pokemon } from '$lib/types/pokemon';

import { MainClient } from 'pokenode-ts';

export type IndexPokemon = Pokemon & {
	id: string;
	image: string;
};

const api = new MainClient();

const getIdByUrl = (url: string) => {
	const splitUrl = url.split('/');
	return splitUrl[splitUrl.length - 2];
};

export const load = (async () => {
	const pokemonsResponse = await api.pokemon.listPokemons(0, 150);

	const pokemons = pokemonsResponse.results.map((pokemon: Pokemon) => {
		const id = getIdByUrl(pokemon.url);
		return {
			name: pokemon.name,
			url: pokemon.url,
			id,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
		};
	});

	const regionsResponse = await api.location.listRegions();

	const regions = regionsResponse.results.map((region) => {
		const id = getIdByUrl(region.url);
		return {
			name: region.name,
			url: region.url,
			id
		};
	});

	return { pokemons, regions };
}) satisfies PageLoad;
