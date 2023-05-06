<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	let popupSettings: PopupSettings = {
		event: 'hover',
		target: 'goBackPopup'
	};
</script>

<!-- popup -->
<div class="card variant-filled-secondary p-4" data-popup="goBackPopup">
	Volver al inicio
	<div class="arrow variant-filled-secondary" />
</div>

<div class="flex justify-center items-center h-full">
	<div class="md:w-[50%] md:h-[90%] max-sm:w-[90%] max-sm:h-[90%]">
		<div class="flex h-full">
			<!-- Go back button -->
			<button
				type="button"
				class="btn absolute"
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
			<div class="flex justify-center items-center h-full w-full">
				<div
					class="flex items-center md:gap-5 max-sm:flex max-sm:flex-col max-sm:h-full max-sm:items-center max-sm:justify-center"
				>
					<img src="/404.png" alt="" class="md:w-56" />
					<div class="flex flex-col max-sm:text-center max-sm:mt-5">
						<h1>404</h1>
						<p>Pagina no encontrada</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
