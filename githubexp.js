const apiurl = "https://api.github.com/users/";
const main = document.querySelector("#main");

const getUser = async (username) => {
    const response = await fetch(apiurl + username);
    const data = await response.json();
    console.log(data);
    const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="avatar">
                <h3>${data.login}</h3>
            </div>
            <div class="userinfo">
                <h3>${"User Name  : " + data.name}</h3>
                <p>${data.bio}</p>
                <ul class="info">
                    <li><strong>${"Followers : " + data.followers}</strong></li>
                    <li><strong>${"Following : " + data.following}</strong></li>
                    <li><strong>${"Repositories : " + data.public_repos}</strong></li>
                </ul>
            </div>
            <div id="repos"></div>
        </div>
    `;
    main.innerHTML = card;
    getRepos(username);
};

const getRepos = async (username) => {
    const response = await fetch(apiurl + username + "/repos");
    const data = await response.json();
    const repos = document.querySelector("#repos");
    repos.innerHTML = ''; // Clear previous content
    data.forEach((element) => {
        console.log(element);
        const elem = document.createElement("a");
        elem.classList.add("repos");
        elem.href = element.html_url;
        elem.innerText = element.name; // Show the repo name
        elem.target = "_blank";
        repos.appendChild(elem);
        const br = document.createElement("br");
    });
};

const formsubmit = () => {
    const searchbox = document.querySelector("#search").value;
    if (searchbox !== "") {
        getUser(searchbox);
    }
    return false; // Prevent form submission
};

document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    formsubmit();
});
