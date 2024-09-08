import api from "./utility/axios.js";
import debouncer from "./utility/debouncer.js";
import throttle from "./utility/throttle.js";

/**
 * Fetches and displays user data based on the provided username.
 * @param {string} name - The username to search for.
 */
async function getUserData(name) {
    try {
        // Fetch followers
        const followersResponse = await api.get(`/users/${name}/followers`);
        const followers = followersResponse.data;

        document.querySelector("#search-value").innerHTML = `${name}`;
        
        // Fetch details for each follower
        const userDetailsPromises = followers.map(follower => api.get(`/users/${follower.login}`));
        const userDetailsResponses = await Promise.all(userDetailsPromises);

        // Process and display user details
        const userDetails = userDetailsResponses.map(response => response.data);
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = userDetails.map(user => `
            <tr>
                <td style="display: flex; align-items: center; gap: 10px;">
                    <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
                    ${user.login}
                </td>
                <td>${user.name || "N/A"}</td>
                <td>${user.following}</td>
                <td>${user.followers}</td>
                <td>${user.public_repos}</td>
                <td><a href="${user.html_url}" target="_blank">View Profile</a></td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

/**
 * Checks the current GitHub API rate limit status.
 */
async function checkRateLimit() {
    try {
        const response = await api.get("/rate_limit");
        console.log("Rate Limit Status:", response.data);
    } catch (error) {
        console.error("Error checking rate limit:", error);
    }
}

// Create throttled and debounced functions
const throttledScroll = throttle(checkRateLimit, 200);
const debouncedGetUser = debouncer(getUserData, 1000);

// Add event listeners
document.querySelector("form").addEventListener("input", (event) => {
    debouncedGetUser(event.target.value);
});

window.addEventListener('DOMContentLoaded', () => {
    getUserData('beesou777');
    checkRateLimit();
});

window.addEventListener('scroll', () => {
    throttledScroll();
});
