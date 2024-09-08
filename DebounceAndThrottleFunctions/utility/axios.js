import axios from "axios";

const api = axios.create({
    baseURL : "https://api.github.com/",
    headers: {
        'Authorization': `${process.env.GITHUB_TOKEN}`,
    }
})


export default api