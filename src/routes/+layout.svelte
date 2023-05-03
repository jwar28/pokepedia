<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';

	// Your custom Skeleton theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">Header</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">
		<div class="flex justify-center mb-1">
			<button>
				<a href="https://github.com/jwar28" target="_blank"
					><img
						src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
						class="w-6 h-auto"
						alt="github-logo"
					/></a
				>
			</button>
		</div></svelte:fragment
	>
</AppShell>
