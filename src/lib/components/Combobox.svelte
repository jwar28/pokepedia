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

	export let comboboxValue: string;
	export let comboboxItems: Item[];
</script>

<button class="btn input w-48" use:popup={popupCombobox}>
	{comboboxValue}
</button>

<div class="card w-48 shadow-xl" data-popup="combobox">
	<!-- Listbox -->
	<ListBox rounded="rounded-none z-40 p-4">
		{#each comboboxItems as item}
			<ListBoxItem bind:group={comboboxValue} name="small" value={item.value}
				>{item.name}</ListBoxItem
			>
		{/each}
	</ListBox>
	<!-- Arrow -->
	<div class="arrow bg-black" />
</div>
