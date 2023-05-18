import type { CustomItem } from '$lib/types/item';
import type { IndexPokemon, Pokemon } from '$lib/types/pokemon';
import type { Region } from '$lib/types/region';
import { MainClient, type Item, type NamedAPIResourceList, type Generation } from 'pokenode-ts';

const mainClient = new MainClient();

const getIdByUrl = (url: string) => {
	const splitUrl = url.split('/');
	return splitUrl[splitUrl.length - 2];
};

export const getAllPokemons = async (): Promise<IndexPokemon[]> => {
	let pokemonReponse: NamedAPIResourceList;
	let pokemons: {
		name: string;
		url: string;
		id: string;
		image: string;
	}[] = [];

	try {
		pokemonReponse = await mainClient.pokemon.listPokemons(0, 1007);
		pokemons = pokemonReponse.results.map((pokemon: Pokemon) => {
			const id = getIdByUrl(pokemon.url);
			return {
				name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
				url: pokemon.url,
				id,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
			};
		});
	} catch (err) {
		console.log(err);
	}

	return pokemons;
};

export const getPokemonById = async (id: string) =>
	await mainClient.pokemon.getPokemonById(parseInt(id));

export const getPokemonsByRegion = async (region: string): Promise<IndexPokemon[]> => {
	let pokemonResponse: Generation;
	let pokemons: {
		name: string;
		url: string;
		id: string;
		image: string;
	}[] = [];

	try {
		pokemonResponse = await mainClient.game.getGenerationById(parseInt(region));
		pokemons = pokemonResponse.pokemon_species.map((pokemon: Pokemon) => {
			const id = getIdByUrl(pokemon.url);
			return {
				name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
				url: pokemon.url,
				id,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
			};
		});
	} catch (err) {
		console.log(err);
	}

	return pokemons.sort((poke1, poke2) => parseInt(poke1.id) - parseInt(poke2.id));
};

export const getPokemonRegions = async (): Promise<Region[]> => {
	let regionsResponse: NamedAPIResourceList;
	let regions: {
		name: string;
		url: string;
		id: string;
	}[] = [];

	try {
		regionsResponse = await mainClient.location.listRegions();
		regions = regionsResponse.results.map((region) => {
			const id = getIdByUrl(region.url);
			return {
				name: region.name[0].toUpperCase() + region.name.slice(1),
				url: region.url,
				id
			};
		});
		regions.pop();
	} catch (err) {
		console.log(err);
	}

	return regions;
};

const getItemByName = async (name: string): Promise<Item> =>
	await mainClient.item.getItemByName(name);

export const getAllItems = async (): Promise<CustomItem[]> => {
	let itemsResponse: NamedAPIResourceList;
	let itemListPromises: Promise<Item>[] = [];
	let itemList: CustomItem[] = [];

	try {
		itemsResponse = await mainClient.item.listItems(0, 20);

		itemListPromises = itemsResponse.results.map((item) => {
			return getItemByName(item.name);
		});

		itemList = (await Promise.all(itemListPromises)).map((item) => {
			return {
				name: item.name[0].toUpperCase() + item.name.slice(1).replace('-', ' '),
				id: item.id,
				sprite: item.sprites.default,
				category:
					item.category.name[0].toUpperCase() + item.category.name.slice(1).replace('-', ' '),
				effect: item.effect_entries[0].effect.split(':')[1]
			};
		});
	} catch (err) {
		console.log(err);
	}

	return itemList;
};
