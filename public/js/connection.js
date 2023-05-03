const socket = io();

// Elements of the form
const submitSessionCode = document.getElementById("submitSessionCode");
const submitUserName = document.getElementById("submitUserName");
const sessionCode = document.getElementById("inputCode");
const userName = document.getElementById("inputUserName");

// Slides
const code_slide = document.querySelector(".slide_registration.code__slide");
const name_slide = document.querySelector(".slide_registration.name__slide");
const chat_slide = document.querySelector(".slide_registration.chat__slide");
const slides = [code_slide, name_slide, chat_slide]

function changeSlide(slide) {
    slides.forEach(removeSlide => {
        removeSlide.classList.remove("active");
    });
    slide.classList.add("active");
}

let SESSION = 0;
let USERNAME = "User";

submitSessionCode.addEventListener("click", event => {
    event.preventDefault();
    SESSION = sessionCode.value;
    socket.emit("joinRoom", SESSION);
    changeSlide(name_slide)
});

submitUserName.addEventListener("click", event => {
    event.preventDefault();
    changeSlide(chat_slide);
    USERNAME = userName.value;
    socket.emit("fillUser", {
        'name': USERNAME,
        'session': SESSION
    });
});

