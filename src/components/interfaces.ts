import type { Permissions } from "./enums";

interface Comments {
    comment_id: number,
    username: string,
    story_id: number,
    body: string,
    created_at: string,
}[];

interface Stories {
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

export type { Comments, Stories, Category, Users}