<script lang="ts">
	import { getPokemonsByRegion } from '$lib/api/pokemonApi';
	import Combobox from '$lib/components/Combobox.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Pokecard from '$lib/components/Pokecard.svelte';
	import { randomPokemonListGenerated } from '$lib/stores/pokemonStore';
	import { randomizerSelectedRegionName } from '$lib/stores/regionStore';
	import type { IndexPokemon } from '$lib/types/pokemon';
	import type { PageData } from '../$types';

	export let data: PageData;

	let selectedRegion;
	randomizerSelectedRegionName.subscribe((value) => {
		selectedRegion = value;
	});

	let pokemonRegionSelection: string = selectedRegion || 'Open me';
	let regionComboboxOptions = data.regionComboboxOptions;

	let randomPokemonListStore;
	randomPokemonListGenerated.subscribe((data) => {
		randomPokemonListStore = data;
	});
	let randomPokemonList: IndexPokemon[] = randomPokemonListStore || [];

	let isLoading: boolean = false;

	$: selectedRegionId =
		regionComboboxOptions.find((region) => region.name === pokemonRegionSelection)?.id || '';

	const setRandomPokemonStore = (pokemonList: IndexPokemon[]) =>
		randomPokemonListGenerated.set(pokemonList);

	const setrandomizerSelectedRegionName = (name: string) => randomizerSelectedRegionName.set(name);

	const getRandomPokemons = (array: any[], quantity: number) => {
		const randomPokemons: any[] = [];

		if (quantity > array.length) {
			throw new Error('The quantity is higher than the array length.');
		}

		while (randomPokemons.length < quantity) {
			const index = Math.floor(Math.random() * array.length);
			const value = array[index];

			if (!randomPokemons.includes(value)) {
				randomPokemons.push(value);
			}
		}

		return randomPokemons;
	};

	const onHandleClick = async () => {
		if (!pokemonRegionSelection.includes('Open me')) {
			isLoading = true;

			try {
				let pokemonList = await getPokemonsByRegion(selectedRegionId);
				randomPokemonList = getRandomPokemons(pokemonList, 6);
				setrandomizerSelectedRegionName(pokemonRegionSelection);
				setRandomPokemonStore(randomPokemonList);
			} catch (error) {
				console.error(error);
			}

			isLoading = false;
		}
	};
</script>

<div class="absolute bg-[#e4e6ee] w-full z-30 py-3 shadow-md">
	<div class="flex justify-center">
		<div class="flex justify-center w-full max-lg:flex-wrap max-lg:gap-2 gap-5">
			<p class="flex items-center">Select region:</p>
			<Combobox
				bind:comboboxSelection={pokemonRegionSelection}
				comboboxName="RegionCombobox"
				comboboxItems={regionComboboxOptions}
			/>
			<button class="btn variant-ringed-primary" on:click={onHandleClick}>Randomize!</button>
		</div>
	</div>
</div>

<div class="w-full flex justify-center items-center h-full overflow-auto">
	{#if isLoading}
		<div class="self-center">
			<Loading />
		</div>
	{:else if randomPokemonList.length === 0}
		<div>
			<p class="text-center mb-5">No random pokemons generated.</p>
			<img src="/loading-random.gif" alt="" />
		</div>
	{:else}
		<div class="flex justify-center items-center mt-14 max-sm:mt-32 max-sm:mb-5">
			<div class="flex flex-col justify-center items-center max-w-6xl">
				<p class="mb-2">This is your run</p>

				<div class="flex flex-row flex-wrap justify-evenly gap-9">
					{#each randomPokemonList as pokemon (pokemon.id)}
						<Pokecard {pokemon} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
