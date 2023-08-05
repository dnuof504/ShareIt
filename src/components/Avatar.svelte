
<script lang="ts">
	import { goto } from "$app/navigation";
import { changeAvatar, checkAvatarExists, replaceUserAvatar, uploadUserAvatar, } from "../../server";
import {loggedAs} from "../store"
import { Label, Fileupload } from 'flowbite-svelte'


let avatar: File;

let fileuploadprops = {
  id : 'user_avatar'
}

let fileuploadprops2 = {
  id : 'user_avatar2'
}

let newUrl:string;

// function handleSubmit (){
//     changeAvatar($loggedAs,newUrl )
//     goto("/account")
// }

async function handleSubmit2 () {
  const avatarExists = await checkAvatarExists($loggedAs)
  if (!avatarExists) {
    uploadUserAvatar($loggedAs, avatar)
    .then((path)=>{
      console.log(path)
      newUrl = `https://jxdsmvzqgqofgdetgfha.supabase.co/storage/v1/object/public/users/${path}`
      changeAvatar($loggedAs, newUrl)
      goto("/account")
    })

  } else {
    replaceUserAvatar($loggedAs, avatar)
    .then((path)=>{
      console.log(path)
      newUrl = `https://jxdsmvzqgqofgdetgfha.supabase.co/storage/v1/object/public/users/${path}`
      changeAvatar($loggedAs, newUrl)
      goto("/account")
    })
  }
}


function handleFileSelection (e: any) {
  avatar = e.target.files[0]
}
</script>



<!-- <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-6">
      <label for="avatar_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change your Avatar</label>
      <input bind:value={newUrl} type="url" id="avatar_url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    </div>


   
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form> -->


  <form on:submit|preventDefault={handleSubmit2}>
    <Label class="pb-2">Upload file</Label>
    <Fileupload {...fileuploadprops} on:change={handleFileSelection}/>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

  </form>
  