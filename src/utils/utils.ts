import { fetchAllUsers } from "../../server"
import type { Comment, Comments, Users } from "../components/interfaces"

export async function checkUser (username: string, password: string) {
    return fetchAllUsers()
    .then((allUsers)=>{
        return allUsers!.filter((user) => {
            if (user.username===username && user.password===password) {
                return username
            }
        })
    })
    .then((user)=>{
        return user
    })
}

export function checkUpdatedUser (userInfo: any, userInfoCopy:any) {
    const output = {...userInfo}

    Object.keys(userInfoCopy).forEach((key)=>{
        if (userInfoCopy[key] !== '') {
            output[key] = userInfoCopy[key]
        }
    })
    return output
}

export const formatDate = (date: Date) => new Date(date).toLocaleString()

export function arrangeComments (author: Users[], commentsArray: Comments[]) {
    console.log(author, commentsArray)
    return commentsArray.map((comment: Comments)=>{
        const commentCopy = {...comment}
        const usersCopy = [...author]
        const postedBy = usersCopy.filter((user)=>{
            if (user.username===comment.username)
            return user
        })
        return {
            title: postedBy[0].name,
            date: commentCopy.created_at,
            alt: '',
            src: postedBy[0].avatar_url,
            text: commentCopy.body,
            id: commentCopy.comment_id,
            username: postedBy[0].username,
        }
    })

}