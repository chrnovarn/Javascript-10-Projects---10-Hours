
const APIURL = 'https://api.github.com/users/';
const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//getUser("chrnovarn");

async function getUser(user){
    const resp = await fetch(
        APIURL+user, 
        {headers: new Headers({
        'Authorization': API_token, 
        })}
    );
    const headers = await resp;
    const respData = await resp.json();
    
    createUserCard(respData);

    getRepos(user);
}

async function getRepos(user){
    const resp = await fetch(
        APIURL+user+"/repos",
        {headers: new Headers({
            'Authorization': API_token, 
            })}
    );
    const repos = await resp.json();


    
    addReposToCard(repos);
};
function addReposToCard(repos){
    console.log(repos);
    const reposEl = document.getElementById("repos");
    repos.sort((a,b) => b.stargazers_count - a.stargazers_count)
        .slice(0,10)
        .forEach(repo => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    })
    
}
function createUserCard(user){
    
    const cardHTML = `
    <div class="card">
        <div>
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul class="info">
                <li><strong>${user.followers} Followers</strong></li>
                <li><strong>${user.following} Following</strong></li>
                <li><strong>${user.public_repos} Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
    `
    main.innerHTML = cardHTML;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value = "";
    }
})