document.addEventListener("DOMContentLoaded", function() {
  const text = "Vusala Alakbarova";
  const typingElement = document.getElementById("typing-text");
  const description = document.getElementById("description");
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 120);
    } else {
      typingElement.style.borderRight = "none"; // remove cursor
      setTimeout(() => {
        description.classList.add("show");
      }, 400); // fade in text slightly after typing ends
    }
  }

  typeEffect();
});
