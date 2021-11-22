const form = document.querySelector('form');

form.addEventListener('submit', createAuthor);

async function createAuthor(event){
    event.preventDefault();

    const nameInputValue = document.querySelector('#name').value;
    const shortIntroInputValue = document.querySelector('#short_intro').value;
    // const avatarInputValue = document.querySelector('#avatar').files[0];

    // const formData = new FormData();
    // formData.append('name', nameInputValue);
    // formData.append('short_intro', shortIntroInputValue);
    // formData.append('avatar', avatarInputValue);

    const response = await fetch('http://localhost:3000/api/author', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: nameInputValue,
            short_intro: shortIntroInputValue
         })
    });
    console.log(response);

} 