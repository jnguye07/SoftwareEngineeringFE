import axios from 'axios'

const USERS_API_BASE_URL = 'http://localhost:8080/api/users/'

class userService {
    getUsers(username, password) {

        const tempUser = {
            username: username,
            passwordHash: password
        }

        const something = axios.post(USERS_API_BASE_URL + "login", tempUser)
            .then(data => {
                if (data.status >= 200 || data.status <= 300) {
                    return true;
                } else if (data.status >= 400) {
                    return false
                } else {
                    return false;
                }
            }).catch(data => {
                console.error("Error:", data);
                return null;
            });
        console.log(something);
        if (something) {
            return something;
        } else {
            return false;
        }

    }
}


export default new userService()