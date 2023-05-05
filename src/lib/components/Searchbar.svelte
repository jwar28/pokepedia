<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let autocompleteOptions: AutocompleteOption[];
	export let searchString: string;
	export let onSelection: any;
	export let placeholder: string;

	let popupSettings: PopupSettings = {
		event: 'focus',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

<input
	class="input autocomplete w-80"
	type="search"
	bind:value={searchString}
	{placeholder}
	use:popup={popupSettings}
/>
<div data-popup="popupAutocomplete">
	<div class="card w-80 max-h-60 p-4 overflow-y-auto z-40">
		<Autocomplete
			bind:input={searchString}
			options={autocompleteOptions}
			on:selection={onSelection}
		/>
	</div>
</div>
