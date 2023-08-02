<script lang="ts">
	import { postComment } from "../../server";
	import { comments, loggedAs } from "../store";
    import { getContext } from 'svelte';

    let slug: number = getContext('slug')

    let newComment= {
        username: $loggedAs,
        story_id: slug,
        body: "",
    }

    const handleSubmit = () => {
        postComment(newComment)
        .then((postedComment)=>{
            console.log(postedComment)
        })
    }

</script>

<form action="" on:submit|preventDefault={handleSubmit}>
    <label for="add-comment"/>
    <input type="text" id="add=comment" bind:value={newComment.body} required />
    <button type="submit">Add Comment</button>
</form>