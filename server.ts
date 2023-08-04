import type { Comment, Users, Story } from './src/components/interfaces';
import {supabase} from './src/lib/supabaseClient';


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


