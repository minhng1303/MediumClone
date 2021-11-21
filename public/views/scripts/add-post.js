const form = document.querySelector("form");

form.addEventListener("submit", onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  console.log("hello");
  const inputTitle = document.querySelector("input#title");
  const inputTitleValue = inputTitle.value;

  const inputAuthor = document.querySelector("input#author");
  const inputAuthorValue = inputAuthor.value;

  const inputContent = document.querySelector("input#content");
  const inputContentValue = inputContent.value;

  const inputImage = document.querySelector("input#image");
  const inputImageValue = inputImage.files[0];

  console.log(inputImage.files);

  const formData = new FormData();
  formData.append("title", inputTitleValue);
  formData.append("author", inputAuthorValue);
  formData.append("content", inputContentValue);
  formData.append("image", inputImageValue);
  const response = await fetch("http://localhost:3000/api/post", {
    method: "POST",
    body: formData,
  });
  console.log(response);
  window.location.replace('/post.html');
  // document.replace('post.html')
}
