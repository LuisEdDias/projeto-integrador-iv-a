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

    function cpfMask(value) {
        if (!value) return "";
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3}.\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3}.\d{3}.\d{3})(\d)/, '$1-$2');
        return value;
    }

    function fillCheckout(){
        document.querySelector('#checkoutName').textContent = firstName.value + " " + lastName.value;
        document.querySelector('#checkoutCardType').textContent = cardType.value;
        document.querySelector('#checkoutCardNumber').textContent = 'xxxx xxxx xxxx ' + cardNumber.value.substring(12);
        document.querySelector('#checkoutAmount').textContent = donationAmount;
    }

}catch (e){
    console.log(e);
}
