import {postWithUser} from "./api";
export function renderPosts(postsWithUser: postWithUser[]): void{
  const postList = document.getElementById("postList") as HTMLDataListElement;
  postList.innerHTML = "";
  postsWithUser.forEach((postWithUser) => {
    postList.appendChild(createPostEl(postWithUser));
  });
}
export function renderError(filterValue: string): void {
  const postList = document.getElementById("postList")as HTMLDataListElement;
  postList.innerHTML = `<p>"${filterValue}" no result</p>`;
}
function createPostEl({ post, user }: postWithUser): HTMLLIElement {
  const li = document.createElement("li");
  li.innerHTML = `<h2>${post.title}</h2>
          <h3>${user.name}</h3>
          <p>${post.body}</p>
          <p>email: ${user.email}; phone: ${user.phone}</p>`;
  return li;
}
