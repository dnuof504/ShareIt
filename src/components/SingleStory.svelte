<script lang="ts">
	import type { Stories } from './interfaces';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { loggedAs, sentiment } from '../store';
	import { Heading, P } from 'flowbite-svelte';
	let slug: number = getContext('slug');
	let story: Stories[] | [] = [];
	let newVotes: number;
	let sentimentMessage:any = null
	import { fetchSingleStory, sentimentAnalysis, updateVotes } from '../../server';
	import { formatDate } from '../utils/utils';

	onMount(()=>{fetchSingleStory(slug).then((fetchedStory) => {
		story = fetchedStory!;
		newVotes = Number(story[0].votes);
	})});

	async function incrementVotes(votes: number, story_id: number) {
		newVotes = votes + 1;
		await updateVotes(story_id, newVotes)  
		 
	}

	async function handleAnalysis (story:any){
		await sentimentAnalysis(story.body)
		.then((data)=>{
			sentimentMessage=data
		})

	}
</script>


<ul class='flex flex-col flex-wrap justify-center items-center'>
		{#if story.length}
			{#each story as story}


<section class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl  dark:border-gray-700 dark:bg-gray-800 ">
	<div class="flex flex-col justify-between p-4 leading-normal story-body">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl text-center">{story.title}</Heading>
		<img class="object-cover  rounded-t-lg h-96 md:h-auto md:w-auto md:rounded-none md:rounded-l-lg img md:rounded-r-lg " src={story.img_url} alt="">
		<P class="mb-3 story-text" color="text-black-500 dark:text-gray-400 text-xl" >{story.body}</P>
		<P class=" flex flow-row props-block story-text text-lg" color="text-black-500 dark:text-gray-400">
			<div>❤ {newVotes}</div>
			<div>Author: {story.username}</div>
			<div>Category: {story.category_name}</div>
			<div>Posted at: {formatDate(story.created_at)}</div>
		</P>
		<div class="storyButton">
		<button type="button"
		class="storyButton text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
		on:click={() => incrementVotes(story.votes, story.story_id)}
		>Support ❤
		</button>
		</div>
		{#if sentimentMessage !== null}
		<P class="mb-3 story-text" color="text-black-500 dark:text-gray-400 text-xl">The overall sentiment rating is: {sentimentMessage}</P>
		{/if}
		<div class="storyButton">
	<button type="button" class="storyButton text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5 w-8" on:click={()=>{handleAnalysis(story)}}>Use the Power of AI</button>

		</div>

    </div >
</section>



<!-- <li >
					<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">{story.title}</Heading>
				</li>
				<li>
					<img src={story.img_url} class="img" alt="this is something that we can see" />
				</li>

				<button on:click={()=>{
					handleAnalysis(story)
					}}
		class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
		>Use the Power of AI</button>
		{#if sentimentMessage !== null}
  		<p>{sentimentMessage}</p>
			{/if}
				<li>
					<P class="mb-3" weight="light" color="text-black-500 dark:text-gray-400">{story.body}</P>
					<P class="mb-3" weight="light" color="text-black-500 dark:text-gray-400">Posted at: {story.created_at}</P>
					<P class="mb-3" weight="light" color="text-black-500 dark:text-gray-400">likes: {newVotes}</P>
					<P class="mb-3" weight="light" color="text-black-500 dark:text-gray-400">Author: {story.username}</P>
					<P class="mb-3" weight="light" color="text-black-500 dark:text-gray-400">Category: {story.category_name}</P>
				</li> -->
				<br />

				<br />
			{/each}
		{/if}
		<br />
		<br />
</ul>