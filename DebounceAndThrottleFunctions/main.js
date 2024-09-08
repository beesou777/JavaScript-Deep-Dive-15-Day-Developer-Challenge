import api from "./utility/axios.js";
import { debounce } from "chart.js/helpers";
import { throttled } from "chart.js/helpers";

async function getUserData(name) {
    try {
        // Fetch the followers
        const followersResponse = await api.get(`/users/${name}/followers`);
        const followers = followersResponse.data;

        document.querySelector("#search-value").innerHTML = `${name}`
        // For each follower, fetch their details to get additional information
        const userDetailsPromises = followers.map(follower => api.get(`/users/${follower.login}`));
        console.log(userDetailsPromises)
        const userDetailsResponses = await Promise.all(userDetailsPromises);

        // Process the details responses
        const userDetails = userDetailsResponses.map(response => response.data);

        // Populate the table body with user details
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = userDetails.map(user => `
            <tr>
                <td style="display: flex; align-items: center;gap: 10px"><img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
                ${user.login}</td>
                <td>${user.name}</td>
                <td>${user.following}</td>
                <td>${user.followers}</td>
                <td>${user.public_repos}</td>
                <td><span><a href="${user.html_url}">View Profile</a></span></td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("API error:", error);
    }
}

async function checkRateLimit() {
  try {
      const response = await api.get("/rate_limit");
      console.log("Rate Limit Status:", response.data);
  } catch (error) {
      console.error("Error checking rate limit:", error);
  }
}


const throttledScroll = throttled(checkRateLimit, 200);


const debouncedGetUser = debounce(getUserData, 1000);

document.querySelector("form").addEventListener("input", (event) => {
    debouncedGetUser(event.target.value);
});

window.addEventListener('DOMContentLoaded', () => {
    getUserData('beesou777');
    checkRateLimit();

});

window.addEventListener('scroll', () => {
    console.log("scrolled");
    throttledScroll();
})