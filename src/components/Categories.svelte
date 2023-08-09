<script lang="ts">
	import { fetchAllCategories } from '../../server';
	import type { Category } from './interfaces';
	import { Listgroup, ListgroupItem, A } from 'flowbite-svelte';

	let category: Category[] | [] = [];

	fetchAllCategories().then((data) => {
		category = data!;
	});
</script>

<section class="home">
	<Listgroup active class="w-48">
		<h3 class="p-1 text-center text-xl font-medium text-black-900 dark:text-white">
			Categories list
		</h3>
		{#if category.length}
			{#each category as category}
				<ListgroupItem class="text-base font-semibold gap-2">
					<A
						href={`/categories/${category.slug}`}
						class="flex items-center p-3 text-sm font-8xl gap-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline rounded-b-lg"
						>{category.slug}
					</A>
				</ListgroupItem>
			{/each}
		{/if}
	</Listgroup>
</section>
