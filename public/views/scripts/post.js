const post_wrapper_content = document.querySelector(".post-wrapper-content");

async function getPosts() {
  const response = await fetch("http://localhost:3000/api/post");
  const posts = await response.json();
  const post = posts.posts[0];
  console.log(posts.posts[0]);

  const post_content = `
  <h2>${post.title}</h2>

          <span class="text-secondary font-weight-bold"
            >${post.title}</span
          >
  <div class="post-header d-flex mt-3 px-0">
    <img
      class="rounded-circle"
      src="https://miro.medium.com/fit/c/38/38/0*HBZey0gA5wdrIuN0"
    />
    <span class="ml-2">
      <span class="w-100 d-block name"
        >${post.author}
        <span
          class="badge rounded-pill bg-custom text-white ml-2 follow"
          >Follow</span
        >
      </span>
      <span class="time">Nov 10 . 4 min read</span>
      <span><i class="fas fa-star fa-xs"></i></span>
    </span>
    <span class="ml-auto align-self-end">
      <i class="fab fa-twitter-square"></i>
      <i class="fab fa-facebook"></i>
      <i class="fab fa-linkedin"></i>
      <i class="fas fa-link"></i>
      <i class="fas fa-ellipsis-h"></i>
    </span>
  </div>
  
  <div class="mx-auto post-container">
            <img
              class="w-100 mt-4"
              src="https://miro.medium.com/max/700/1*1FO9_wdMf9DHdEDTG9vifw.jpeg"
              alt="family"
            />
            <span class="d-block text-center mt-3 photo-by"
              >Photo by <u>Vlada Karpovich</u> from Pexels
            </span>
          </div>
          <p class="post-wrapper__paragraph mt-3">${post.content}</p>`
  ;

  post_wrapper_content.innerHTML += post_content;
}

getPosts();
