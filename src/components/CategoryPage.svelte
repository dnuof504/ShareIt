<script lang='ts'>
    import { getStoriesByCategory } from '../../server'; 
    import { getContext} from 'svelte';
    import { category_slug} from '../store'
	  import { Card } from 'flowbite-svelte';

    let categoryName:string = getContext('category_name')
    let stories:any= [];
  
    category_slug.subscribe((newCategory)=>{
      getStoriesByCategory(newCategory)
        .then((fetchedStories)=>{
            stories=fetchedStories!
        })
})


  </script>


<ul class="flex flex-col items-center justify-center gap-4 ">
  {#each stories as story}
  <Card img={`https://picsum.photos/10${story.story_id}`} href={`/stories/${story.story_id}`} horizontal>
    <div class="h-52">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{story.title}</h5>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
      {story.body.slice(0, 35)}...
    </p>
  </div>
</Card>
  {/each}
</ul>


