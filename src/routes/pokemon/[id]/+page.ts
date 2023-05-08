import { getPokemonById } from '$lib/api/pokemonApi';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const pokemonId = params.id;

	const pokemon = await getPokemonById(pokemonId);

	return {
		pokemon
	};
}) satisfies PageLoad;
