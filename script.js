let postsContainer = document.getElementById("posts");
let limit = 7;
let currentPage = 1;
let totalPosts = 0;
let posts = []; // Store posts globally

async function postData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    totalPosts = data.length;
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}

function displayPosts(posts, page, limit) {
  postsContainer.innerHTML = "";
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = posts.slice(start, end);

  paginatedPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    `;
    postsContainer.appendChild(postElement); // Corrected this line
  });
}

async function init() {
  posts = await postData(); // Store posts globally
  displayPosts(posts, currentPage, limit);
}

function nextPage() {
  if (currentPage * limit < totalPosts) {
    currentPage++;
    displayPosts(posts, currentPage, limit); // Just update the displayed posts
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPosts(posts, currentPage, limit); // Just update the displayed posts
  }
}

window.onload = init;
