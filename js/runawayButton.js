let contactButton = document.getElementById("contacts");
let links = document.getElementById("contactLinks");

contactButton.addEventListener("click", function () {
  const parentWidth = contactButton.parentElement.clientWidth;
  const childWidth = contactButton.clientWidth;

  if (contactButton.style.left === "0px" || contactButton.style.left === "") {
    contactButton.style.left = parentWidth - childWidth + "px";

    setTimeout(changeVisibility, 500);
    
  } else {
    contactButton.style.left = "0px";
    links.style.display = "none";
  }
});


function changeVisibility() {
    links.style.display = "flex"
  }
