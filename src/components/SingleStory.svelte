<script lang="ts">
	import type { Stories } from './interfaces';
	import { getContext, onDestroy } from 'svelte';
	import { loggedAs } from '../store';
	let slug: number = getContext('slug');
	let story: Stories[] | [] = [];
	let newVotes: number;

	import { fetchSingleStory, updateVotes } from '../../server';
	fetchSingleStory(slug).then((fetchedStory) => {
		story = fetchedStory!;
		newVotes = story[0].votes;
	});

	async function incrementVotes(votes: number, story_id: number) {
		newVotes = votes + 1;
		await updateVotes(story_id, newVotes)   
	}
</script>

<section>
	<ul>
		{#if story.length}
			{#each story as story}
				<li>
					{story.title}
				</li>
				<li>
					{story.body}
				</li>
				<li>
					Author: {story.username}
				</li>
				<li>
					<img src="" alt="this is something that we can see" />
				</li>
				<li>
					Posted at: {story.created_at}
				</li>
				<li>
					likes: {newVotes}
				</li>
				<li>
					Category: {story.category_name}
				</li>
				<br />
				<buttton
					class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					on:click={() => incrementVotes(story.votes, story.story_id)}
					>likes 👍
				</buttton>
				<br />
			{/each}
		{/if}
		<br />
	</ul>
</section>
