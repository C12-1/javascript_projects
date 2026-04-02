const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");



searchInput.addEventListener("keypress" , (e) => {
    if(e.key === "Enter") {
    searchUser() ;
    return;
    }
});
searchBtn.addEventListener("click" , searchUser);

async function searchUser(){
    const username  = searchInput.value.trim();
    if (!username) return alert("please enter a username !!");
    try {
        profileContainer.classList.add("hidden");
        errorContainer.classList.add("hidden");
        const response = await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok) throw new Error("user no found !!")
        const data = await response.json();

        displayUserData(data);
        fetchRepositories(data.repos_url);
    }
    catch (error) {
        showError();
    }
}

function displayUserData(data){
    avatar.src = data.avatar_url;
    nameElement.textContent = data.name || data.login;
    usernameElement.textContent = `@${data.login}`;
    bioElement.textContent = data.bio || "No bio available" ;
    locationElement.textContent = data.location || "Not specified";
    joinedDateElement.textContent = formatDate(data.created_at) ;

    profileLink.href = data.html_url;
    followers.textContent = data.followers;
    following.textContent = data.following;
    repos.textContent = data.public_repos;

    companyElement.textContent = data.company || "Not specified";
    
    if (data.blog) {
        blogElement.textContent = data.blog;
        blogElement.href = data.blog.startsWith("http") ? data.blog : `https://${data.blog}`;
      } else {
        blogElement.textContent = "No website";
        blogElement.href = "#";
        blogElement.target = "_self";
      }
    blogContainer.style.display = "flex";
    
    if (data.twitter_username) {
        twitterElement.textContent = `@${data.twitter_username}`;
        twitterElement.href = `https://twitter.com/${data.twitter_username}`;
    } else {
        twitterElement.textContent = "No Twitter";
        twitterElement.href = "#";
        twitterElement.target = "_self";
    }
    twitterElement.style.display = "flex";
    // this to show the profile 
    profileContainer.classList.remove("hidden");
}


async function fetchRepositories(reposUrl){
    reposContainer.innerHTML = `<div class="loading-repos">Loading repositories...</div>`;

    try{
        const response = await fetch(reposUrl + "?pre_page=15");
        const data = await response.json();
        displayRepos(data);
    }
    catch(error){
        reposContainer.innerHTML = `<div class="no-repos">${error.message}</div>`;
    }
}

function displayRepos(repos){
    if (repos.length === 0){
        reposContainer.innerHTML = "<div class='no-repos'>No repositories found</div>";
        return;
    }
    reposContainer.innerHTML ="";
    repos.forEach((repo) => {
        const repoCard = document.createElement("div");
        repoCard.className = "repo-card";
        const updatedAt = formatDate(repo.updated_at);
        repoCard.innerHTML = `
            <a href="${repo.html_url}" target="_blank" class="repo-name">
                <i class="fas fa-code-branch"></i> ${repo.name}
            </a>
            <p class="repo-description">${repo.description || "No description available"}</p>
            <div class="repo-meta">
                ${
                    repo.language
                        ? `
                    <div class="repo-meta-item">
                        <i class="fas fa-circle"></i> ${repo.language}
                    </div>
                    `
                        : ""
                }
                <div class="repo-meta-item">
                <i class="fas fa-star"></i> ${repo.stargazers_count}
                </div>
                <div class="repo-meta-item">
                <i class="fas fa-code-fork"></i> ${repo.forks_count}
                </div>
                <div class="repo-meta-item">
                <i class="fas fa-history"></i> ${updatedAt}
                </div>
            </div>
            `;
        reposContainer.appendChild(repoCard);
    })
}
function formatDate(dateString){
    return new Date(dateString).toLocaleDateString("en-us" , {
        year : "numeric",
        month : "short",
        day : "numeric",
    });
}

function showError() {
    errorContainer.classList.remove("hidden");
    profileContainer.classList.add("hidden");
}


searchInput.value = "C12-1";

searchUser();