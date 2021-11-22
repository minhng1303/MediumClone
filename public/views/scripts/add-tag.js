const form = document.querySelector('form');
console.log(form);


const createTag = async (event) => {
    event.preventDefault();
    const nameInputValue = document.querySelector('#name').value;

    const response = await fetch('http://localhost:3000/api/tag', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameInputValue })
    })

    console.log(response);

}

form.addEventListener('submit', createTag);
