const form = document.querySelector('#contact-form');

if (form) {
    const formButton = document.querySelector('form button.button');
    const formMessage = document.querySelector('.form-message');
    const responseMessages = {
        emptyFields: 'Please fill out all fields.',
        addResult: 'Please add the numbers correctly.',
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

    const errorsArray = [];
    const errorsObject = {};

    const validate = (data) => {
        for (let [key, value] of Object.entries(data)) {
            errorsObject[key] = value === '' ? false : true;
        }

        // errorsObject.addResult = parseInt(data.addResult) === addResult ? 'correct' : 'incorrect';

        // console.log(typeof addResult, addResult);
        // console.log(data);
        // console.log(errorsObject);
        // console.log(errorsArray);

        errorsArray.length = 0;

        if (Object.values(errorsObject).includes(false)) {
            errorsArray.push(responseMessages.emptyFields);
            if (errorsObject.addResult !== false && parseInt(data.addResult) !== addResult) {
                errorsObject.addResult = 'incorrect';
                errorsArray.push(responseMessages.addResult);
            }
            return false;
        } else {
            if (parseInt(data.addResult) !== addResult) {
                errorsObject.addResult = 'incorrect';
                errorsArray.push(responseMessages.addResult);
            } else {
                return true;
            }
        }
    };

    const formEvent = form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        // const entries = formData.entries();
        const data = Object.fromEntries(formData);

        if (!validate(data)) {
            for (let [key, value] of Object.entries(errorsObject)) {
                if (value === false || value === 'incorrect') {
                    form.querySelector(`[name=${key}]`).classList.add('error');
                } else {
                    form.querySelector(`[name=${key}]`).classList.remove('error');
                }
            }
            formMessage.innerHTML = '';
            errorsArray.forEach(error => {
                formMessage.innerHTML += `<p>${error}</p>`;
            });
            formMessage.classList.remove('hidden');
            formMessage.classList.add('error');
        } else {
            for (let error of Object.entries(errorsObject)) {
                form.querySelector(`[name=${error[0]}]`).classList.remove('error');
            }
            formMessage.innerHTML = '';
            formMessage.classList.remove('error');
            formMessage.classList.add('hidden');
            delete data.addResult;
            sendMail(data);
        }
    });

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
    };
}
