<script lang='ts'>
    import { getStoriesByCategory } from '../../server.ts'; 
    import { getContext} from 'svelte';

    let categoryName = getContext('category_name')
    let stories = [];

    getStoriesByCategory('romance')
    .then((fetchedStories)=>{
        stories=fetchedStories!
    })


  </script>

<ul>
  {#each stories as story}
    <li>{story.body}</li>
  {/each}
</ul>