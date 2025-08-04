function showHamburgerMenu()
{
    const hamburgerMenuDiv = document.getElementById('hamburgerMenuDiv');
    const hamburgerMenuBtn = document.getElementById('hamburgerMenuBtn');

    // Change the icon of the button
    hamburgerMenuBtn.querySelector('i').classList.toggle('fa-bars');
    hamburgerMenuBtn.querySelector('i').classList.toggle('fa-xmark'); 
    
    // Make the hamburgerMenuDiv visible.
    hamburgerMenuDiv.classList.toggle('hidden');

    // Make body unscrollable
    document.querySelector('body').classList.toggle('overflow-hidden');
}

// document.addEventListener here...