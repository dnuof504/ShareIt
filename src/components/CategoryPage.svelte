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


<!-- <div class="max-w-sm w-full lg:max-w-full lg:flex">
  <div class="h-48 lg:h-auto lg:w-24  bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('https://picsum.photos/100')" title="Woman holding a mug">
  </div>
  <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <p class="text-sm text-gray-600 flex items-center">
        <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="https://picsum.photos/100" viewBox="0 0 20 20">
          <!-- <path d="https://picsum.photos/100" /> -->
        <!-- </svg>
        Members only
      </p>
      <div class="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?</div>
      <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
    </div>
    <div class="flex items-center">
      <img class="w-10 h-10 rounded-full mr-4" src="" alt="Avatar of Jonathan Reinink">
      <div class="text-sm">
        <p class="text-gray-900 leading-none">Jonathan Reinink</p>
        <p class="text-gray-600">Aug 18</p>
      </div>
    </div>
  </div>
</div> --> -->