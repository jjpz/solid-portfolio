const form = document.querySelector('#contact-form');
const formButton = document.querySelector('form button.button');
const formMessage = document.querySelector('.form-message');
const responseMessages = {
    success: 'Your message has been sent. Thank you!',
    error: 'There was an error sending your message. Please try again.'
};

if (form) {
    const formEvent = form.addEventListener('submit', (event) => {
        event.preventDefault();
        let formData = new FormData(form);
        // console.log(formData);
        let entries = formData.entries();
        // console.log(entries);
        let data = Object.fromEntries(entries);
        // console.log(data);
        sendMail(data);
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
