<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';
	import Header from '$lib/components/Header.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerOpen = (): void => {
		drawerStore.open({});
	};
</script>

<Drawer><Navigation /></Drawer>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header"
		><AppBar background="bg-[#d6320c]" gap="0"
			><svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-sm" on:click={drawerOpen}>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-8 h-8">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
			</svelte:fragment>
			<div class="flex justify-between items-center">
				<div class="w-full flex max-lg:w-full max-lg:justify-center">
					<Header />
				</div>

				<div class="max-lg:hidden w-full">
					<Navigation />
				</div>
			</div>
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<div class="bg-black w-screen h-1 absolute z-40" />

	<slot />

	<!--  footer  -->
	<svelte:fragment slot="footer">
		<div class="bg-gray-300 w-full h-px absolute" />
		<div class="flex justify-center h-10">
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
