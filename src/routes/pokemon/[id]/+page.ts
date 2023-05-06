import { MainClient } from 'pokenode-ts';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const api = new MainClient();

	const pokemonId = params.id;

	const pokemon = await api.pokemon.getPokemonById(parseInt(pokemonId));

	return {
		pokemon
	};
}) satisfies PageLoad;
