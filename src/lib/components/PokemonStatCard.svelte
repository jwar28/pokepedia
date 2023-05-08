<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { Pokemon } from 'pokenode-ts';

	export let pokemon: Pokemon;

	let popupSettings: PopupSettings = {
		event: 'hover',
		target: 'goBackPopup'
	};

	const pokemonTypes = pokemon.types.map((type) => type.type.name);
	const pokemonStats = pokemon.stats.map((stats) => {
		return {
			name: stats.stat.name[0].toUpperCase() + stats.stat.name.slice(1).replace('-', ' '),
			value: stats.base_stat.toString()
		};
	});
</script>

<!-- popup -->
<div class="card variant-filled-secondary p-4" data-popup="goBackPopup">
	Go home
	<div class="arrow variant-filled-secondary" />
</div>

<div
	class="grid grid-cols-2 max-sm:grid-cols-1 card h-full shadow-xl lg:pl-5 lg:py-5 max-sm:p-5 max-sm:my-5"
>
	<!-- 1 -->
	<div>
		<!-- Image -->
		<div class="bg-[url('/background.svg')] bg-cover bg-blue-300 card h-full shadow-md">
			<div class="flex flex-col h-full">
				<div>
					<!-- Go back button -->
					<button
						type="button"
						class="btn"
						use:popup={popupSettings}
						on:click={() => history.back()}
					>
						<svg
							aria-hidden="true"
							class="w-8 h-8"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M2.407 13.058a1.495 1.495 0 0 1 0-2.116L8.04 5.3c.39-.39 1.03-.39 1.42 0 .39.39.39 1.02 0 1.41L6.744 9.427a9.992 9.992 0 0 1-1.768 1.406l-.342.214.208.207A10 10 0 0 1 7.082 11h13.92a1 1 0 1 1 0 2H7.083a10 10 0 0 1-2.24-.254l-.208.207.342.214c.641.4 1.233.872 1.768 1.406L9.46 17.29c.39.39.39 1.02 0 1.41-.39.39-1.03.39-1.42 0l-5.633-5.642z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
				<div class="flex justify-center items-center h-full">
					<img src={pokemon.sprites.front_default} alt="pokemon" class="w-72 group-hover:hidden" />
				</div>
			</div>
		</div>
	</div>

	<!-- 2 -->
	<div class="md:mx-5 flex flex-col justify-center gap-4 max-lg:mt-5">
		<!-- Basic data -->
		<div class="card variant-ringed flex flex-col gap-3 p-5 shadow-md">
			<p class="text-center">Basic data</p>
			<p>Number: # {pokemon.id}</p>
			<p>Name: {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>

			<div class="flex">
				<p class="mr-4 self-center">Types:</p>
				<div class="flex flex-wrap gap-5">
					{#each pokemonTypes as type}
						<p class="chip variant-ringed">{type[0].toUpperCase() + type.slice(1)}</p>
					{/each}
				</div>
			</div>
		</div>

		<!-- Stats -->
		<div class="card variant-ringed flex flex-col gap-3 p-5 shadow-md">
			<p class="text-center mt-2">Stats</p>
			{#each pokemonStats as stat}
				<p>{stat.name}: {stat.value}</p>
			{/each}
		</div>
	</div>
</div>
