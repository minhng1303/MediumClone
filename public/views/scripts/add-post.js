const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

async function onSubmit() {
    event.preventDefault();

    const inputTitle = document.querySelector('input#title');
    const inputTitleValue = inputTitle.value;

    const inputAuthor = document.querySelector('input#author');
    const inputAuthorValue = inputAuthor.value;

    const inputContent = document.querySelector('input#content');
    const inputContentValue = inputContent.value;

    const inputImage = document.querySelector('input#image');
    const inputImageValue = inputImage.image;

    console.log(inputImageValue);


    const response = await fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            title: inputTitleValue,
            author: inputAuthorValue,
            content: inputContentValue,
            image: inputImageValue
        })
    })
}
