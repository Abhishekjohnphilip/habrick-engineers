const scriptURL =
  "https://script.google.com/macros/s/AKfycbzYzHYFnkvFygdlnv7a_1WraPwUnAQbS1YxbiaKzcIerhzbCD9xRTPKo75q-fHIa90/exec";

const form_one = document.forms["contact-form"];
const submitBtn = form_one.querySelector('button[type="submit"]');

form_one.addEventListener("submit", (e) => {
  e.preventDefault();

  // Disable the submit button to prevent multiple submissions
  submitBtn.disabled = true;

  fetch(scriptURL, { method: "POST", body: new FormData(form_one) })
    .then((response) => response.json())
    .then((data) => {
      // Check for success in the response
      if (data.result === "success") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } else {
        // Handle other cases if needed
        console.error("Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error!", error.message);
    });
});
