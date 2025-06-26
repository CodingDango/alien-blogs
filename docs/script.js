function showHamburgerMenu()
{
    const hamburgerMenuImg = document.getElementById("burgerMenuBg");
    const mobileMenu = document.getElementById("mobile-menu");

    // Change the icon of the button
    hamburgerMenuImg.classList.toggle("close")
    hamburgerMenuImg.classList.toggle("bg-[url(./assets/burgerMenuClose.png)]");
    hamburgerMenuImg.classList.toggle("bg-[url(./assets/burgerMenu.png)]");
    mobileMenu.classList.toggle("hidden")

    // Make the menu appear on the side.
    
}

document.addEventListener("DOMContentLoaded", () => {


});