<script lang="ts">
  import { fetchAllStories, postStory, postStoryCover, updateStorysCover } from "../../server";
  import { loggedAs, stories, coverIsChanged } from "../store";
  import { onDestroy } from 'svelte';
  import { Textarea, Label, Select, Input, Fileupload } from 'flowbite-svelte'



  let selected:any;
  let dropDownCategories = [
   
    {value:"workplace", name:"workplace"},
    {value:"family", name: "family"},
    {value:"romance", name: "romance"},
    {value:"friends", name:"friends"},
    {value:"pets", name: "pets"},
    {value:"general", name: "general"},
  ]




  let newStory = {
     title: "",
     username:$loggedAs,
     body:"",
     img_url:"",
     votes: 0,
     category_name: selected,

}
let cover: File;

let fileuploadprops = {
  id : 'story_cover'
}

let postedStoryId: number;

const unsubscribe = loggedAs.subscribe((newUser) => {
		newStory.username = newUser;
	});
	onDestroy(unsubscribe);


async function handleSubmit() {
   newStory.category_name = selected
	 await postStory(newStory)
   .then((data) => {
    postedStoryId = data![0].story_id;
    postStoryCover(data![0].story_id, cover)
    .then((url)=>{
      const coverUrl= `https://jxdsmvzqgqofgdetgfha.supabase.co/storage/v1/object/public/stories/${url}`
      newStory.img_url=coverUrl
      updateStorysCover(postedStoryId, coverUrl).then(()=>{
        stories.update((newStory) => [...newStory]);
      })
    })

      newStory.body = ""
            newStory.title= ""  
            newStory.img_url = ""
            selected = ""
            
		})

    // await fetchAllStories().then((data)=> {
    //   // console.log(data)
    //      return stories
    //   })
	};


  function handleFileSelection (e: any) {
  cover = e.target.files[0]
}
</script>

<form action="" on:submit|preventDefault={handleSubmit} class="w-full">
  <div>
    <Label for='title' class='block mb-2'>Title</Label>
    <Input type="text" id="title" size="lg" placeholder='title'  bind:value={newStory.title} />
</div>
<Label for='story' class='block mb-2'>Story</Label>
  <Textarea id="story" class='w-96' bind:value={newStory.body} />

  <Label class="pb-2">Upload file</Label>
  <Fileupload {...fileuploadprops} on:change={handleFileSelection}/>
  <div class='mb-6'>
    <Label for='img_url' class='block mb-2'>Image url</Label>
    <Input type="text" id="img_url" size="lg" placeholder='image_url' bind:value={newStory.img_url} />
</div>
  <Label>Select a Category
    <Select class="form-select mt-2" items={dropDownCategories} bind:value={selected}  />
  </Label>
	<button
		type="submit"
		class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"
		>Add Story</button
	>
</form>
