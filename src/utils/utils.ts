import { fetchAllUsers } from "../../server"
import type { Users } from "../components/interfaces"

export async function checkUser (username: string, password: string) {
    let users: Users[] = [];
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