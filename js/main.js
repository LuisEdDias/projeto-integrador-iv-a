// Donation Script
try {
    const donationForm = document.querySelector('#donationForm');
    const checkout = document.querySelector('#checkout');
    const backToPayment = document.querySelector('#backToPayment');
    const payAmount = document.querySelector('#payAmount');
    const thanks = document.querySelector('#thanks');
    const donationAmountSelect = document.querySelector('#donationAmountSelect');
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#emailPayment');
    const cpf = document.querySelector('#cpf');
    const cardType = document.querySelector('input[name="cardType"]:checked');
    const nameOnCard = document.querySelector('#nameOnCard');
    const cardNumber = document.querySelector('#cardNumber');
    const cardExpiration = document.querySelector('#cardExpiration');
    const cardCVV = document.querySelector('#cardCVV');
    let donationAmount = document.querySelector('input[name="inlineRadioOptions"]:checked').value;


    // Amount Selection Script
    donationAmountSelect.addEventListener('change', e => {
        const amountOtherInput = document.querySelector('#amountOtherInput');
        const amountOther = document.querySelector('#amountOther');
        amountOther.value = amountOtherInput.value;
        donationAmount = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    })

    // CPF Mask
    cpf.addEventListener('input', e => {
        cpf.value = cpfMask(cpf.value);
    })

    // Form Submit Script
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (donationAmount < 10) {
            alert('O valor mínimo para doar no cartão de crédito é R$10');
            return;
        }

        fillCheckout();

        donationForm.style.display = 'none';
        checkout.style.display = 'block';
    });

    // Submit the form
    payAmount.addEventListener('click', () => {
        checkout.style.display = 'none';
        thanks.style.display = 'block';
    })

    // Return to Payment Form
    backToPayment.addEventListener('click', (e) => {
        e.preventDefault();
        checkout.style.display = 'none';
        donationForm.style.display = 'block';
    })

    // CPF Mask function
    function cpfMask(value) {
        if (!value) return "";
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3}.\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3}.\d{3}.\d{3})(\d)/, '$1-$2');
        return value;
    }

    // Fill the checkout card
    function fillCheckout(){
        document.querySelector('#checkoutName').textContent = firstName.value + " " + lastName.value;
        document.querySelector('#checkoutCardType').textContent = cardType.value;
        document.querySelector('#checkoutCardNumber').textContent = 'xxxx xxxx xxxx ' + cardNumber.value.substring(12);
        document.querySelector('#checkoutAmount').textContent = donationAmount;
    }

}catch (e){
    console.log(e);
}

// Search Script
try {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');

    // Submit the search form
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const term = searchInput.value.trim();
        performSearch(term);
    });

    // Perform the search
    function performSearch(term) {
        // Clear old results
        clearHighlights();
        resultsList.innerHTML = '';
        searchResults.style.display = 'none';

        if (!term) {
            return;
        }

        // Minimum word length to search
        if (term.length < 3){
            return;
        }

        // Selects the elements where the search should be performed
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

        const regex = new RegExp(`(${term})`, 'gi');
        let resultId = 0;

        elements.forEach(el => {
            if (regex.test(el.textContent)) {
                // Highlights the text found
                let id = 'result' + resultId;
                el.innerHTML = el.innerHTML.replace(regex, `<i class='highlight' id='${id}'>$1</i>`);
                resultId++;

                // Adds the element to the result list
                const listItem = document.createElement('div');
                listItem.classList.add('page-item');
                listItem.classList.add('col-auto');

                const link = document.createElement('a');
                link.href = `#${id}`;
                link.classList.add('page-link');
                link.textContent = resultId.toString();
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetElement = document.getElementById(id);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'nearest'
                        });
                    }
                });

                listItem.appendChild(link);
                resultsList.appendChild(listItem);
            }
        });

        if (resultId > 0) {
            searchResults.style.display = 'block';
        } else {
            alert("Nenhum resultado encontrado!");
        }
    }

    // Cleans the highLights
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            clearHighlights();
            searchResults.style.display = 'none';
        }
    });

    // Cleans to clean highlights
    function clearHighlights() {
        const highlightedElements = document.querySelectorAll('.highlight');
        highlightedElements.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
        });
    }
} catch (e) {
    console.log(e);
}

// Function to toggle the nav menu when a link is clicked
try {
    document.querySelectorAll('.nav-button-out').forEach(function(link) {
        link.addEventListener('click', function(event) {
            const navbarToggler = document.getElementById('navbarToggler');
            const clickOut = document.getElementById("clickOut");
            if (navbarToggler.classList.contains('show')) {
                navbarToggler.classList.remove('show');
            } else {
                clickOut.click();
            }
        });
    });
} catch (e) {
    console.log(e);
}

// Contact Modal Script
try {
    const contactForm = document.getElementById('contactForm');
    const contactName = document.getElementById('name');
    const contactEmail = document.getElementById('email');
    const contactSubject = document.getElementById('subject');
    const contactMessage = document.getElementById('message');
    const modal = new mdb.Modal(document.getElementById('contactModal'));

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactName.value = "";
        contactEmail.value = "";
        contactSubject.value = "";
        contactMessage.value = "";
        modal.show();
    })
} catch (e) {
    console.log(e);
}
