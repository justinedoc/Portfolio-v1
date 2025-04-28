"use strict";

const firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  senderEmail = document.getElementById("senderEmail"),
  emailMessage = document.getElementById("message"),
  sendBtn = document.getElementById("sendBtn");

const sendEmail = () => {
  emailjs.init({
    publicKey: "x1eU8Vi3QY3kZlkds",
    blockList: {
      list: [
        "foo@emailjs.com",
        "bar@emailjs.com",
        "test@gmail.com",
        "testing@email.com",
        "test*",
      ],
      watchVariable: senderEmail.value,
    },
  });

  const sender = {
    to_name: "Justin",
    from_name: `${firstName.value} ${lastName.value}`,
    message: emailMessage.value,
    sender_email: senderEmail.value,
  };

  emailjs
    .send("service_t9g4ca2", "template_usb6k2q", sender)
    .then((response) => {
      console.log(`sent succefully, ${(response.status, response.text)}`);
      // Clear form inputs
      firstName.value = "";
      lastName.value = "";
      senderEmail.value = "";
      emailMessage.value = "";

      Swal.fire({
        title: "Mail sent Successfully!",
        icon: "success",
        backdrop: `rgba(0,0,5,0.4)`,
        iconColor: "#12f7ffca",
        timer: 3000,
      });
    }),
    (error) => {
      console.log("Failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! \n try again",
        backdrop: `rgba(0,0,5,0.4)`,
        timer: 3000,
      });
    };
};

const validation = () => {
  if (
    firstName.value &&
    lastName.value &&
    senderEmail.value &&
    emailMessage.value
  ) {
    sendEmail();

    // Disable send button after submission
    sendBtn.disabled = true;
    setTimeout(() => {
      sendBtn.disabled = false;
    }, 5000);
  } else {
    console.log("invalid");
    Swal.fire({
      icon: "error",
      title: "Incomplete details",
      backdrop: `rgba(0,0,5,0.4)`,
      timer: 3000,
    });
  }
};

sendBtn.addEventListener("click", validation);
