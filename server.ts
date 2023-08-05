import type { Comment, Users, Story } from './src/components/interfaces';
import {supabase} from './src/lib/supabaseClient';
import axios from 'axios';
import { sentiment } from './src/store';

export async function fetchAllComments () {

    const { data, error } = await supabase
      .from('comments')
      .select();
    return data
}

export async function fetchAllStories () {

    const { data, error } = await supabase
      .from('stories')
      .select()
      .order("created_at", {ascending: false})
    return data
}

export async function fetchAllCategories () {

  const { data, error } = await supabase
    .from('category')
    .select();
  return data
}

export async function fetchAllUsers () {

  const { data, error } = await supabase
    .from('users')
    .select();
  return data
}

export async function postUser (obj: Users) {

const username = obj.username
const name = obj.name
const avatar_url = obj.avatar_url
const email = obj.email
const biography = obj.biography
const password = obj.password
const permissions = obj.permissions

  const {data, error} = await supabase

    .from('users')
    .insert([{
      username, 
      name, 
      avatar_url,
      email, 
      biography, 
      password, 
      permissions
    }])
    .select()
  return data
}

export async function getStoriesByCategory(slug: string) {
  const { data, error } = await supabase
  .from('stories')
  .select()
  .eq('category_name', slug)
    return data}
export async function fetchSingleStory (id: number) {
  const { data, error } = await supabase
    .from('stories')
    .select()
    .eq('story_id', id)
  return data
}

export async function fetchStoryComments(id: number) {
  const { data, error } = await supabase
    .from('comments')
    .select()
    .eq('story_id', id)
    .order('created_at', { ascending: false })
  return data
}

export async function deleteSingleComment(id: number){
  const { error } = await supabase
  .from('comments')
  .delete()
  .eq('comment_id', id)
}

export async function postComment(obj: Comment) {
  const username = obj.username
  const story_id = obj.story_id
  const body = obj.body
 

  const { data, error} = await supabase
  .from('comments')
  .insert([{
    username,
    story_id,
    body,
  }])
 
  return data
}


export async function postStory(obj: Story) {
  const category_name = obj.category_name
  const title = obj.title
  const username = obj.username
  const body = obj.body
  const img_url = obj.img_url
  const votes = obj.votes 

  const { data, error} = await supabase
  .from('stories')
  .insert([{
    category_name,
    title,
    username,
    body,
    img_url,
    votes
  }])
 .select()
  return data
}

export async function deleteSingleStory(id: number){
  const { error } = await supabase
  .from('stories')
  .delete()
  .eq('story_id', id)
}

export async function updateVotes(id: number, newVote: number){
  const {data, error} = await supabase
  .from('stories')
  .update({"votes": newVote})
  .eq("story_id", id)
  .select("votes")
  return data
}
export async function fetchUser (username: string) {

  const {data, error} = await supabase
    .from('users')
    .select()
    .eq("username", username)
  return data
}

export async function patchUser(user:Users) {

  const {data, error} = await supabase
    .from('users')
    .update({
      username: user.username,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      biography: user.biography,
      permissions: user.permissions,
      password: user.password
    })
    .eq('username', user.username)
    .select()
    return data
}


export async function deleteUser(username:string){
  const {error} = await supabase
  .from("users")
  .delete()
  .eq("username", username)

}

export async function changeAvatar(username:string,newAvatar:string){
  const  {data, error} = await supabase
  .from("users")
  .update({avatar_url:newAvatar})
  .eq("username", username)
  return data
}
export async function sentimentAnalysis(body:string){


const options = {
  method:'POST',
  url: "https://api.edenai.run/v2/text/sentiment_analysis",
  headers:
  {
  authorization:"Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWIxM2YzMzUtMzNjNi00YWJjLTllYWYtOGY0NTg0Yzc5MjU3IiwidHlwZSI6ImFwaV90b2tlbiJ9.gpinhCHmGzG5I9qSj9m3l2R_zQFnrp3z60z89Ef9XU8"},
  data:{
    providers:"ibm",
    text:body,
    language:"en",
  },
};
return axios
.request(options)
.then((response)=>{
  return response.data.ibm.general_sentiment
})


}

export async function checkAvatarExists (username:string) {

  const { data:folderFiles, error } = await supabase
    .storage
    .from('avatars')
    .list(`${username}`)
  folderFiles?.filter((file)=>{/^(avatar)/.test(file.name)});
  if (folderFiles?.length) {
    return true
  } else {
    return false
  }

  return true
};


export async function uploadUserAvatar (username:string, file: File) {
  const allowedExtentions = ['JPEG', 'jpeg', 'jpg', 'JPG', 'png', 'PNG', 'gif', 'GIF']
  // const extention = new RegExp('\.(jpg|JPG|gif|GIF|png|PNG)$')
  const extention = file.name.split('.').filter(slice=>allowedExtentions.includes(slice))
  if(extention[0] === 'jpeg') {
    extention.pop()
    extention.push('jpg')
  }
  const  {data:avatar, error} = await supabase
    .storage
    .from(`avatars`)
    .upload(`${username}/avatar.${extention}`, file, {
    cacheControl: '3600',
    upsert: false
    })
    return avatar?.path

}

export async function replaceUserAvatar (username:string, file: File) {

  const { data:folderFiles, error:fetchingError } = await supabase
  .storage
  .from('avatars')
  .list(`${username}`);
  const filesToRemove = folderFiles?.map((file) => `${username}/${file.name}`).filter((filename)=>{
    if(/(avatar)/g.test(filename)) {
      return filename
    }
  });
  const {error:removingError} = await supabase
  .storage
  .from('avatars')
  .remove(filesToRemove!)

  const uploading = uploadUserAvatar(username, file)

  return uploading;
}