<script lang="ts">
	import { getStoriesByCategory } from '../../server';
	import { getContext } from 'svelte';
	import { category_slug } from '../store';
	import { Card } from 'flowbite-svelte';
	import StoryCard from './StoryCard.svelte';

	let categoryName: string = getContext('category_name');
	let stories: any = [];

	category_slug.subscribe((newCategory) => {
		getStoriesByCategory(newCategory).then((fetchedStories) => {
			stories = fetchedStories!;
		});
	});
</script>

<section class="flex flex-col items-center justify-center gap-4">
	<div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4 place-content-center h-100">
		{#each stories as story}
			<StoryCard
				title={story.title}
				id={story.story_id}
				body={story.body}
				username={story.username}
				img_url={story.img_url}
			/>
		{/each}
	</div>
</section>
