<script lang="ts">
	import { fetchStoryComments, deleteSingleComment, fetchAllUsers } from '../../server';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { loggedAs } from '../store';
	import AddComments from './AddComments.svelte';
	import { comments } from '../store';
	import { arrangeComments, formatDate } from '../utils/utils';
	import { Activity, ActivityItem } from 'flowbite-svelte';
	
	let storyId: number = getContext('slug');
	let renderComments: any = [];
	let users: any = [];
	let activities: any = [];

	onMount(() => {
		fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
		})
		.then(()=>{
			fetchAllUsers()
			.then((data)=>{
				users=data;
			})
			.then(()=>{
				activities = arrangeComments(users, renderComments)
			})
		})
	});

	const unsubscribe = comments.subscribe(() =>
		fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
			activities = arrangeComments(users, renderComments)
		})
	);

	onDestroy(unsubscribe);

	async function handleDelete(comment_id: number) {
		await deleteSingleComment(comment_id);

		await fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
			activities = arrangeComments(users, renderComments)
		});
	}
</script>

<AddComments />

<ul class="border">
	{#if renderComments.length}
	{#key activities}
	<Activity>
		<ActivityItem {activities} />
	</Activity>
	{/key}
		<!-- {#each renderComments as comment} -->
		
			

			<!-- <li>
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
			</li> -->
		<!-- {/each} -->
	{/if}
</ul>
