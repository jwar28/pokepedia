<script lang="ts">
	export let pokemonId: string;
	export let pokemonName: string;
	export let pokemonSprite: string;
</script>

<a class="block card card-hover p-5 shadow-md" href="/">
	<div class="flex justify-between items-center w-80 overflow-hidden">
		<div class="w-full">
			<p>#{pokemonId}</p>
			<p>{pokemonName}</p>
		</div>
		<img src={pokemonSprite} alt={pokemonName} class="h-40 w-40" />
	</div>
</a>
