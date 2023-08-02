<script lang='ts'>
    import { fetchStoryComments } from "../../server";
    import { getContext } from 'svelte';
    import type { Comments } from "./interfaces";
	import AddComments from "./AddComments.svelte";
    let user: any = getContext('ourUser')
    console.log(user)
    let slug: number = getContext('slug')
    let comments: Comments [] | [] = [];
    fetchStoryComments(slug)
    .then((fetchedComments)=>{
        comments=fetchedComments!;
    })

</script>
<AddComments />
<ul class="border">
    {#if comments.length}
    {#each comments as comments}
    <li>
        <b>{comments.username} said:</b> {comments.body} <b>IT HAPPENED</b> {comments.created_at}
    </li>
    {/each}
    {/if}
</ul>