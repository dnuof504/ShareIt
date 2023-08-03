import type { Permissions } from "./enums";

interface Comment {
    username: string,
    story_id: number,
    body: string,
}
interface Comments {
    comment_id: number,
    username: string,
    story_id: number,
    body: string,
    created_at: string,
}[];

interface Story {
    category_name:string
    title:string,
    username: string,
    body: string,
    img_url:string,
    votes: number
}

interface Stories {
    title: string,
    story_id: number,
    username: string,
    created_at: string,
    body: string,
    votes: number,
    img_url: string,
    category_name: string,
}[];

interface Category {
    slug: string,
    description: string,

}[];

interface Users {
    username: string,
    name: string,
    avatar_url: string,
    email: string,
    biography: string,
    password: string,
    permissions: Permissions,
}[];

export type { Comments, Stories, Category, Users, Comment, Story}