import type { CustomItem } from '$lib/types/item';
import type { IndexPokemon, Pokemon } from '$lib/types/pokemon';
import type { Region } from '$lib/types/region';
import { MainClient, type Item } from 'pokenode-ts';

const api = new MainClient();

const getIdByUrl = (url: string) => {
	const splitUrl = url.split('/');
	return splitUrl[splitUrl.length - 2];
};

export const getAllPokemons = async (): Promise<IndexPokemon[]> => {
	const pokemonReponse = await api.pokemon.listPokemons(0, 1007);

	const pokemons = pokemonReponse.results.map((pokemon: Pokemon) => {
		const id = getIdByUrl(pokemon.url);
		return {
			name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
			url: pokemon.url,
			id,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
		};
	});

	return pokemons;
};

export const getPokemonById = async (id: string) => await api.pokemon.getPokemonById(parseInt(id));

export const getPokemonsByRegion = async (region: string): Promise<IndexPokemon[]> => {
	const pokemonResponse = await api.game.getGenerationById(parseInt(region));

	const pokemons = pokemonResponse.pokemon_species.map((pokemon: Pokemon) => {
		const id = getIdByUrl(pokemon.url);
		return {
			name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
			url: pokemon.url,
			id,
			image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
		};
	});

	return pokemons.sort((poke1, poke2) => parseInt(poke1.id) - parseInt(poke2.id));
};

export const getPokemonRegions = async (): Promise<Region[]> => {
	const regionsResponse = await api.location.listRegions();

	const regions = regionsResponse.results.map((region) => {
		const id = getIdByUrl(region.url);
		return {
			name: region.name[0].toUpperCase() + region.name.slice(1),
			url: region.url,
			id
		};
	});
	regions.pop();

	return regions;
};

const getItemByName = async (name: string): Promise<Item> => await api.item.getItemByName(name);

export const getAllItems = async (): Promise<CustomItem[]> => {
	const itemsResponse = await api.item.listItems(0, 175);

	const itemListPromises = itemsResponse.results.map((item) => {
		return getItemByName(item.name);
	});

	const itemList: CustomItem[] = (await Promise.all(itemListPromises)).map((item) => {
		return {
			name: item.name[0].toUpperCase() + item.name.slice(1).replace('-', ' '),
			id: item.id,
			sprite: item.sprites.default,
			category: item.category.name[0].toUpperCase() + item.category.name.slice(1).replace('-', ' '),
			effect: item.effect_entries[0].effect.split(':')[1]
		};
	});

	return itemList;
};
