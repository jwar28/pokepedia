import { getAllItems } from '$lib/api/pokemonApi';
import type { PageLoad } from './$types';

export const load = (async () => {
	const items = await getAllItems();
	return { items };
}) satisfies PageLoad;
