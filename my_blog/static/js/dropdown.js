const dropdownContainerSelector = '[data-dropdown]';
const dropdownTogglerSelector = "[data-toggle='dropdown']";

function closeAllDropdowns() {
    document.querySelectorAll(dropdownContainerSelector)
    .forEach((dropdown) => {
        dropdown.classList.add('hidden');
    });
}

function detectClickForDropdownToggles(event) {
    const elementInsideToggleClicked = event.target.closest(dropdownTogglerSelector);
    const isDropdownToggle = event.target.matches(dropdownTogglerSelector) || elementInsideToggleClicked;
    const isElementInDropdown = event.target.closest(dropdownContainerSelector);
    
    if (!isDropdownToggle && !isElementInDropdown) {
        closeAllDropdowns();
        return;
    }
    
    const dropdownToggleElement = elementInsideToggleClicked || event.target; 

    if (isDropdownToggle) {
        const dropdownContainer = dropdownToggleElement.nextElementSibling;
        const isDropdownOpen = !dropdownContainer.classList.contains('hidden');

        closeAllDropdowns();

        if (!isDropdownOpen) {
            dropdownContainer.classList.remove('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        detectClickForDropdownToggles(event);
    });
});
