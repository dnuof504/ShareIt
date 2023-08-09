<script lang="ts">
	import type { Comment } from 'svelte/types/compiler/interfaces';
	import { twMerge } from 'tailwind-merge';
	import { loggedAs, rights } from '../store';
	import { formatDate } from '../utils/utils';
	export let renderComments: Comment[];
	export let liClass = 'mb-10 ml-6';
	export let spanClass =
		'flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900';
	export let imgClass = 'rounded-full shadow-lg';
	export let outerDivClass =
		'p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600 my-6';
	export let innerDivClass = 'justify-between items-center mb-3 sm:flex';
	export let timeClass = 'mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0';
	export let titleClass = 'text-lg font-normal text-purple-500 lex dark:text-gray-300';
	export let textClass =
		'p-3 text-md italic font-normal text-black-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-black-600 dark:border-gray-500 dark:text-black-300';
	export let handleDelete: Function;
	let liCls = twMerge(liClass, $$props.classLi);
	let spanCls = twMerge(spanClass, $$props.classSpan);
	let imgCls = twMerge(imgClass, $$props.classImg);
	let outerDivCls = twMerge(outerDivClass, $$props.classOuterDiv);
	let innerDivCls = twMerge(innerDivClass, $$props.classInnerDiv);
	let timeCls = twMerge(timeClass, $$props.classTime);
	let titleCls = twMerge(titleClass, $$props.classTitle);
	let textCls = twMerge(textClass, $$props.classText);
	let src = 'dsfdsfdsfds';
	let alt = '';

</script>

{#each renderComments as { username, created_at, body, comment_id }}
	<!-- <li class={liCls}> -->
	<!-- <span class={spanCls}>
          <img class={imgCls} {src} {alt} />
        </span> -->
	<div class={outerDivCls}>
		<div class={innerDivCls}>
			<time class={timeCls}>{formatDate(created_at)}</time>
			<div class={titleCls}>
				{@html username}
			</div>
		</div>
		{#if body}
			<div class={textCls}>
				{@html body}
			</div>
		{/if}
		{#if username === $loggedAs && username !== 'Anonymous'}
			<div class="self-right my-3">
				<button
					class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center mr-2 mb-2"
					on:click|preventDefault={() => {
						handleDelete(comment_id);
					}}>Delete Comment</button
				>
			</div>
		{:else if $rights === 'ADMIN'}
			<div class="self-right my-3">
				<button
					class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center mr-2 mb-2"
					on:click|preventDefault={() => {
						handleDelete(comment_id);
					}}>Delete Comment</button
				>
			</div>
		{/if}
	</div>
	<!-- </li> -->
{/each}
