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