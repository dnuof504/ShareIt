<script lang="ts">
	import { fetchStoryComments, deleteSingleComment } from '../../server';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { loggedAs } from '../store';
	import AddComments from './AddComments.svelte';
	let storyId: number = getContext('slug');
	import { comments } from '../store';
	import { formatDate } from '../utils/utils';
	import { Activity } from 'flowbite-svelte';
	import CommentCard from './CommentCard.svelte';


	let activities = [
		  {
			title:
			  'Bonnie moved <a href="/" class="font-semibold text-primary-600 dark:text-primary-500 hover:underline">Jese Leos</a> to <span class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">Funny Group</span>',
			date: 'just now',
			alt: 'image alt here',
			src: '/images/profile-picture-2.webp'
		  },
		  {
			title: 'We don’t serve their kind here! What? Your droids. ',
			date: '2 hours ago',
			alt: 'image alt here',
			src: '/images/profile-picture-2.webp',
			text: 'The approach will not be easy. You are required to maneuver straight down this trench and skim the surface to this point. The target area is only two meters wide. '
		  },
		  {
			title: 'They’ll have to wait outside. We don’t want them here. ',
			date: '1 day ago',
			alt: 'image alt here',
			src: '/images/profile-picture-3.webp'
		  }
		];

	let renderComments: any = [];

	onMount(() => {
		fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
		});
	});

	const unsubscribe = comments.subscribe(() =>
		fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
		})
	);

	onDestroy(unsubscribe);

	async function handleDelete(comment_id: number) {
		await deleteSingleComment(comment_id);

		await fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
		});
	}
</script>

<AddComments />
<ul class="border">
	{#if renderComments.length}

	  <Activity>
		<CommentCard {renderComments}/>
	  </Activity>
		{#each renderComments as comment}
			<li>
				<b>{comment.username} said:</b>
				{comment.body} <b>it happened on:</b>
				{formatDate(comment.created_at)}
				{#if comment.username === $loggedAs}
					<button
						on:click={() => {
							handleDelete(comment.comment_id);
						}}
						type="button"
						class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						>Delete Comment</button
					>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
