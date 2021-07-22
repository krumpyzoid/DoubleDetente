import axios from "axios"

const API_URL = 'http://localhost:1337/auth/local'

class AuthService {
    login(user) {
        return axios.post(API_URL, {
            identifier: user.identifier,
            password: user.password
        })
            .then(res => {
                if(res.data.jwt) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }
                return res.data
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL, {
            email: user.email,
            password: user.password
        })
    }
}

export default new AuthService()