const form = document.querySelector('#contact-form');
const formButton = document.querySelector('form button.button');
const formMessage = document.querySelector('.form-message');
const responseMessages = {
    success: 'Your message has been sent. Thank you!',
    error: 'There was an error sending your message. Please try again.'
};

const randNum1 = Math.floor(Math.random() * 10);
const randNum2 = Math.floor(Math.random() * 10);
const addNum1 = document.querySelector('#add-num-1');
const addNum2 = document.querySelector('#add-num-2');
const addResult = randNum1 + randNum2;

addNum1.innerHTML = randNum1;
addNum2.innerHTML = randNum2;

if (form) {
    const formEvent = form.addEventListener('submit', (event) => {
        event.preventDefault();
        let formData = new FormData(form);
        console.log(formData);
        let entries = formData.entries();
        console.log(entries);
        let data = Object.fromEntries(entries);
        console.log(data);
        if (data.addResult != addResult) {
            formMessage.innerHTML = 'Please add the numbers correctly.';
            formMessage.classList.remove('hidden');
            formMessage.classList.add('error');
        } else {
            sendMail(data);
        }
    });
}

const sendMail = (data) => {
    formButton.innerHTML = 'Sending...';
    formButton.disabled = true;
    fetch('send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok && response.status === 200) {
            formMessage.innerHTML = responseMessages.success;
            formMessage.classList.remove('hidden');
            formMessage.classList.add('success');
            form.reset();
        } else {
            formMessage.innerHTML = responseMessages.error;
            formMessage.classList.remove('hidden');
            formMessage.classList.add('error');
        }
        formButton.innerHTML = 'Send';
        formButton.disabled = false;
    });
}
