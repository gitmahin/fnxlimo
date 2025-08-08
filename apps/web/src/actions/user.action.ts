"use server"

import axios from "axios"

export async function createUser() {
    const response = await axios.post("/wp/v2/users")
    console.log(response)
}