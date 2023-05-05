import type { PageLoad } from './$types';
import type { Pokemon } from '$lib/types/pokemon';

import { MainClient } from 'pokenode-ts';

export type IndexPokemon = Pokemon & {
	id: string | number;
	image: string;
};

const api = new MainClient();

const getIdByUrl = (url: string) => {
	const splitUrl = url.split('/');
	return splitUrl[splitUrl.length - 2];
};

export const load = (async () => {
	const pokemonsResponse = await api.game.getGenerationById(1);

	const pokemons = pokemonsResponse.pokemon_species.map((pokemon: Pokemon) => {
		const id = getIdByUrl(pokemon.url);
		return {
			name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
			url: pokemon.url,
			id,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
		};
	});

	pokemons.sort((poke1, poke2) => parseInt(poke1.id) - parseInt(poke2.id));

	const regionsResponse = await api.location.listRegions();

	const regions = regionsResponse.results.map((region) => {
		const id = getIdByUrl(region.url);
		return {
			name: region.name[0].toUpperCase() + region.name.slice(1),
			url: region.url,
			id
		};
	});

	return { pokemons, regions };
}) satisfies PageLoad;
