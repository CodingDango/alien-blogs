function showHamburgerMenu()
{
    const hamburgerMenuImg = document.getElementById("burgerMenuBg");
    const mobileMenu = document.getElementById("mobile-menu");

    // Change the icon of the button
    hamburgerMenuImg.classList.toggle("close")
    hamburgerMenuImg.classList.toggle("bg-burger-icon");
    hamburgerMenuImg.classList.toggle("bg-close-icon");
    mobileMenu.classList.toggle("hidden")
}