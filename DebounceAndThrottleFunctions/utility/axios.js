import axios from "axios";
/**
 * Configures the Axios instance for GitHub API with authorization.
 */
const api = axios.create({
    baseURL : "https://api.github.com/",
    headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    }
})


export default api