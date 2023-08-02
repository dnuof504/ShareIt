<script lang='ts'>
    import { fetchStoryComments, deleteSingleComment } from "../../server";
    import { getContext } from 'svelte';
    import type { Comments } from "./interfaces";
    import { loggedAs } from "../store";
    import AddComments from "./AddComments.svelte";
    let user: any = getContext('ourUser')
    console.log(user)
    let slug: number = getContext('slug')
    let comments: Comments [] | [] = [];
    fetchStoryComments(slug)
    .then((fetchedComments)=>{
        comments=fetchedComments!;
    })
    function handleClick (comment_id:number){
        deleteSingleComment(comment_id)
    }
</script>
<AddComments />
<ul class="border">
    {#if comments.length}
    {#each comments as comments}
    <li>
        <b>{comments.username} said:</b> {comments.body} <b>IT HAPPENED</b> {comments.created_at}
        {#if comments.username === $loggedAs}
        <button on:click={()=>{handleClick(comments.comment_id)}} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete Comment</button>

        {/if}
    </li>
    {/each}
    {/if}
</ul>

</section>