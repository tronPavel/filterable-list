 type user ={
  id: number;
  name: string;
  email: string;
  phone: string;
}
type post ={
  userId: number;
  id: number;
  title: string;
  body: string;
}
export type postWithUser ={
  post: post;
  user: user;
}
const BASE_URL = `https://jsonplaceholder.typicode.com`;
export async function getPostsWithUsers(filter = ""): Promise<postWithUser[]>  {
  const posts = await fetchPosts(filter);
  const usersIds = [...new Set(posts.map((post: post) => post.userId))];
  const users = await Promise.all(usersIds.map((userId) => fetchUser(userId)));
  const result = posts.reduce((acc: postWithUser[], p: post) => {
    const user = users.find((u) => u.id == p.userId);
    if (user) {
      acc.push({
        post: p,
        user: user,
      });
    }
    return acc;
  }, []);
  
  return result;
}
async function fetchPosts(filter= ""): Promise<post[]> {
  const url = `posts?title_like=${encodeURIComponent(filter)}`;
  return getDate(url);
}
async function fetchUser(userId: number): Promise<user> {
  const url = `users/${userId}`;
  return getDate(url);
}
async function getDate(partUrl: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/${partUrl}`);
  if (!response.ok) {
    throw new Error(`error! ${response.status}`);
  }
  const date = await response.json();
  return date;
}
