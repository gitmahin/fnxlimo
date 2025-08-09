import axios from "axios"

class UserService {

    private async createUser() {
        const response = await axios.post("")

        return response
    }
}

export const userService = new UserService()