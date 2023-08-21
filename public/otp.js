const tokenElem = document.querySelector('input[name="OTP-input"]');
const submitBtnElem = document.querySelector('#submit_btn');
const formElem = document.querySelector('form#primary_form');



function submitForm() {
  submitBtnElem.setAttribute('disabled', '');
  setTimeout(() => {
    tokenElem.closest('form').submit();
  }, 2000);
}


console.log("Aaaaaaaaaaaaaaaaaaammmm", window);
console.log("Aaaaaaaaaaaaaaaaaaammmm", window.OTPCredential);
if (window.OTPCredential) {
  window.addEventListener('DOMContentLoaded', e => {
    console.log("ZZZZZZZZZZZZZZZZZZZ", e);

    const input = document.querySelector('input[name="OTP-input"]');
    console.log("AAAAAAAAAAA", input);
    if (!input) return;
    const ac = new AbortController();
    const form = input.closest('form#primary_form');
    if (form) {
      form.addEventListener('submit', e => {
        ac.abort();
      });
    }
    window.navigator.credentials.get({
      otp: { transport: ['sms'] },
      signal: ac.signal
    }).then(otp => {
      input.value = otp.code;
      submitForm();
    }).catch(err => {
      console.log(err);
    });
  });
}