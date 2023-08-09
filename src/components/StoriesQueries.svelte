<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { stories } from '../store';
	import { filterStories } from '../../server';
	import StoryCard from './StoryCard.svelte';
	import { Label, Select } from 'flowbite-svelte';

	let orderCriteria: string;
	let sortBy: 'ASC' | 'DESC' | '';
	let filterBy: string;

	let filteredStories: any = [];

	async function updateFilteredStories() {
		filteredStories = await filterStories(filterBy, orderCriteria, sortBy);
	}

	onMount(updateFilteredStories);

	const unsubscribe = stories.subscribe(() => {
		filterStories(filterBy, orderCriteria, sortBy).then((data) => {
			filteredStories = data!;
		});
	});

	onDestroy(unsubscribe);

	function handleFilterChange() {
		updateFilteredStories();
	}

	function resetFilters() {
		 orderCriteria = '';
  		 sortBy = '';
  		 filterBy = '';
		updateFilteredStories();
	}

</script>

<main class="flex flex-col items-center justify-center gap-4">
	<div class="flex flex-col text-center">
		<button
			class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
			type="button"
			data-drawer-target="drawer"
			data-drawer-show="drawer"
			aria-controls="drawer"
		>
			Filter stories
		</button>
	</div>
	<section>
		<div
			id="drawer"
			class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
			tabindex="-1"
			aria-labelledby="drawer-label"
		>
			<h5
				id="drawer-label"
				class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
			>
				Filter options
			</h5>
			<button
				type="button"
				data-drawer-hide="drawer"
				aria-controls="drawer"
				class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
			>
				<svg
					class="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
				<span class="sr-only">Close menu</span>
			</button>

			<div class="mb-6 w-72">
				<div class="text-base font-semibold gap-2">
					<Label for="order" class="block mb-2 text-gray-900 dark:text-white">Order by:</Label>
					<Select
						id="order"
						name="filterOption"
						bind:value={orderCriteria}
						on:change={handleFilterChange}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="created_at" style="font-size: 16px">Date</option>
						<option value="votes" style="font-size: 16px">Votes</option>
					</Select>
				</div>

				<div class="text-base font-semibold gap-2">
					<Label
						for="categories"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories:</Label
					>
					<Select
						id="categories"
						name="filterOption"
						bind:value={filterBy}
						on:change={handleFilterChange}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="workplace" class="text-lg">Workplace</option>
						<option value="romance">Romance</option>
						<option value="family">Family</option>
						<option value="friends">Friends</option>
						<option value="pets">Pets</option>
						<option value="general">General</option>
					</Select>
				</div>

				<div class="text-base font-semibold gap-2">
					<Label for="sort" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Sort:</Label
					>
					<Select
						id="sort"
						name="orderOption"
						bind:value={sortBy}
						on:change={handleFilterChange}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="DESC">Descending</option>
						<option value="ASC">Ascending</option>
					</Select>
				</div>
				<button
					type="button"
					on:click|preventDefault={resetFilters}
					class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center mr-2 mb-2 my-5 w-auto"
					>Reset filters</button
				>
			</div>
		</div>
	</section>

	<div class="flex flex-col items-center justify-center gap-4">
		<ul class="grid md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-center h-100">
			{#each filteredStories as story}
				<StoryCard
					title={story.title}
					id={story.story_id}
					body={story.body}
					username={story.username}
					img_url={story.img_url}
				/>
			{/each}
		</ul>
	</div>
</main>
