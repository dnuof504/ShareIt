<script lang='ts'>
    import { setContext } from 'svelte'
	import SingleStory from "../../../components/SingleStory.svelte";
	import SingleStoryComments from '../../../components/SingleStoryComments.svelte';
    export let data
    setContext('slug', data.params.slug)

</script>

<SingleStory />

<SingleStoryComments />