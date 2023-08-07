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
	<h1 class="p-1 text-center text-xl font-medium text-black-900 dark:text-white">Filter options</h1>
	<section>
		<Listgroup active class="w-96">
			<ListgroupItem class="text-base font-semibold gap-2">
				<Label>Order by:</Label>
				<Select name="filterOption" bind:value={orderCriteria} on:change={handleFilterChange}>
					<option value="created_at">Date</option>
					<option value="votes">Votes</option>
				</Select>
			</ListgroupItem>

			<ListgroupItem class="text-base font-semibold gap-2">
				<Label>Categories:</Label>
				<Select name="filterOption" bind:value={filterBy} on:change={handleFilterChange}>
					<option value="workplace">Workplace</option>
					<option value="romance">Romance</option>
					<option value="family">Family</option>
					<option value="friends">Friends</option>
					<option value="pets">Pets</option>
					<option value="general">General</option>
				</Select>
			</ListgroupItem>

			<ListgroupItem class="text-base font-semibold gap-2">
				<Label>Sort:</Label>
				<Select name="orderOption" bind:value={sortBy} on:change={handleFilterChange}>
					<option value="ASC">Ascending</option>
					<option value="DESC">Descending</option>
				</Select>
			</ListgroupItem>
		</Listgroup>
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
