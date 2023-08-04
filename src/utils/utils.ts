import { fetchAllUsers } from "../../server"
import type { Users } from "../components/interfaces"

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

export const formatDate = (date: string) => new Date(date).toLocaleString()