<script lang='ts'>
	import { fetchAllComments } from "../../server";
    import type { Comments } from "./interfaces"

   let comments: Comments[] | [] = [];

   fetchAllComments()
    .then((data)=>{
        comments = data!
    })
    
</script>

<ul>
    {#if comments.length}
    {#each comments as comments}
    <li>
        {comments.body}
    </li>
    {/each}
    {/if}
</ul>
