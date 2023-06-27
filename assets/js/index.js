let buttonSubmit = document.querySelector('.contact-me-form-button');

buttonSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    let contactFormFields = document.querySelectorAll('.form-control');
    let contactForm = document.querySelector('#contact-me-form');
    let contactFormIsValid = contactForm.checkValidity();
    let formHasError = []

    contactFormFields.forEach(field => {
        field.value ? null : formHasError.push(field)
    });

    if (!contactFormIsValid || formHasError.length > 0) {
        contactForm.reportValidity();
        showToast(isValid = false)
    } else {
        showToast(isValid = true);
        sendEmail();
    }
})

const sendEmail = _ => {
    let form = document.querySelector('#contact-me-form')
    let senderName = form.elements['Name'].value
    let senderEmail = form.elements['Email'].value
    let senderMessage = form.elements['Message'].value

    if (senderName && senderEmail && senderMessage) {
        Email.send({
            SecureToken: '8f7962a2-2362-44fb-b831-5dca6e23b796',
            To: 'pinheiropassosm@gmail.com',
            From: 'pinheiropassosm@gmail.com',
            Subject: `${senderEmail} - ${senderName}`,
            Body: senderMessage
        }).then((successMessage) => console.log(successMessage)).catch((errorMessage) => console.log(errorMessage));
    }
}

const showToast = isValid => {
    const toastId = isValid ? 'liveToastSuccess' : 'liveToastError'
    const toastLiveExample = document.getElementById(toastId);
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
}
