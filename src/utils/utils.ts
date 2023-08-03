import { fetchAllUsers } from "../../server"

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

export const formatDate = (date: Date) => new Date(date).toLocaleString()