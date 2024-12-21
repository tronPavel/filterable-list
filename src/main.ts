import { renderPosts, renderError } from "./render";
import { getPostsWithUsers } from "./api";

async function renderAll(){
  const posts = await getPostsWithUsers();
  renderPosts(posts);
}
renderAll();

const filterInput = document.getElementById("filterInput")as HTMLUListElement;
filterInput.addEventListener("input", (event) => {
  const filterValue = (event.target as HTMLInputElement).value;
  let debounce;
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    getPostsWithUsers(filterValue).then((postWithUser) => {
      if (postWithUser.length === 0) {
        renderError(filterValue);
      } else {
        renderPosts(postWithUser);
      }
    });
  }, 600);
});
