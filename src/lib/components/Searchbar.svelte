<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let searchString: string;
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
