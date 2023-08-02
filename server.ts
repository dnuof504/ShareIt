import type { Users } from './src/components/interfaces';
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
      .select();
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
  .select()
  .order('created_at', { ascending: false })
  return data
}