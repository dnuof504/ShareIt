<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import { loggedAs, rights, coverIsChanged } from '../store';
	import { deleteSingleStory, deleteStoryImage, fetchAllStories } from '../../server';
	import { goto } from '$app/navigation';
	let hCard = false;
	export let title: string;
	export let id: number;
	export let body: string;
	export let img_url: string
	export let username: string;

	let renderStories: any = [];

	async function handleDeleteClick(story_id: number, img_url: string) {
		await deleteSingleStory(story_id);
		await deleteStoryImage(img_url)
		await fetchAllStories().then((responseStories) => {
			renderStories = responseStories
			goto("/stories")
		});
	}
</script>

<div>
	<Card img={img_url} href={`/stories/${id}`} horizontal>
		<div class="h-52">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{body.slice(0, 35)}...
			</p>
			<Button
				href={`/stories/${id}`}
				class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"
				>Read more</Button
			>
			{#if ($loggedAs === username && username !== "Anonymous") }

				<Button
					type="button"
					class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"
					on:click={() => handleDeleteClick(id, img_url)}>Delete Story</Button
				>
				{:else if $rights === "ADMIN"}
				<Button
				type="button"
				class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"
				on:click={() => handleDeleteClick(id, img_url)}>Delete Story</Button
			>
			{/if}
		</div>
	</Card>
</div>
