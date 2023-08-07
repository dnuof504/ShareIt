<script lang="ts">
	import { onMount } from 'svelte';
	import { filterStories } from '../../server';
	import { Label, Listgroup, ListgroupItem, Select } from 'flowbite-svelte';
	import StoryCard from './StoryCard.svelte';

	let orderCriteria: string;
	let sortBy: 'ASC' | 'DESC';
	let filterBy: string;

	let filteredStories: any = [];

	async function updateFilteredStories() {
		filteredStories = await filterStories(filterBy, orderCriteria, sortBy);
	}

	onMount(updateFilteredStories);

	function handleFilterChange() {
		updateFilteredStories();
	}
</script>

<main class="flex flex-col items-center justify-center gap-4">
	<div class="text-center">
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

			<div class="mb-6">
				<Listgroup active class="w-72">
					<ListgroupItem class="text-base font-semibold gap-2">
						<Label for="order" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Order by:</Label
						>
						<Select
							id="order"
							name="filterOption"
							bind:value={orderCriteria}
							on:change={handleFilterChange}
						>
							<option value="created_at">Date</option>
							<option value="votes">Votes</option>
						</Select>
					</ListgroupItem>

					<ListgroupItem class="text-base font-semibold gap-2">
						<Label
							for="categories"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Categories:</Label
						>
						<Select
							id="categories"
							name="filterOption"
							bind:value={filterBy}
							on:change={handleFilterChange}
						>
							<option value="workplace">Workplace</option>
							<option value="romance">Romance</option>
							<option value="family">Family</option>
							<option value="friends">Friends</option>
							<option value="pets">Pets</option>
							<option value="general">General</option>
						</Select>
					</ListgroupItem>

					<ListgroupItem class="text-base font-semibold gap-2">
						<Label for="sort" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Sort:</Label
						>
						<Select id="sort" name="orderOption" bind:value={sortBy} on:change={handleFilterChange}>
							<option value="ASC">Ascending</option>
							<option value="DESC">Descending</option>
						</Select>
					</ListgroupItem>
				</Listgroup>
			</div>
		</div>
	</section>
		

	<div class="flex flex-col items-center justify-center gap-4">
		<ul class="grid grid-cols-2 gap-4 place-content-center h-100 ...">
			{#each filteredStories as story}
				<StoryCard
					title={story.title}
					id={story.story_id}
					body={story.body}
					username={story.username}
				/>
			{/each}
		</ul>
	</div>
</main>
