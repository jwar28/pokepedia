<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	type Item = {
		name: string;
		value: string;
	};

	let popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'combobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	export let comboboxSelection: string;
	export let comboboxItems: Item[];
	export let comboboxName: string;
</script>

<button class="btn variant-ringed-primary w-fit" use:popup={popupCombobox}>
	{comboboxSelection}
</button>

<div class="card w-48 shadow-xl overflow-scroll h-96" data-popup="combobox">
	<!-- Listbox -->
	<ListBox rounded="rounded-none">
		{#each comboboxItems as item}
			<ListBoxItem bind:group={comboboxSelection} bind:name={comboboxName} value={item.value}>
				{item.name}
			</ListBoxItem>
		{/each}
	</ListBox>
	<!-- Arrow -->
	<div class="arrow bg-black" />
</div>
