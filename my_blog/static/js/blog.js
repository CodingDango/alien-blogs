function applyEventToFilterBtn() {
    applyDropdown('filter-button', 'filter-dropdown')
}

function applyEventToSortByBtn() {
    applyDropdown('sort-by-button', 'sort-by-dropdown')
    // Not yet.. still have to find out which option they clicked.
    document.getElementById('sort-by-active').textContent;
}

function applyDropdown(btnElementId, dropdownElementId) {
    const btnElement = document.getElementById(btnElementId)
    const dropdownElement = document.getElementById(dropdownElementId)

    btnElement.addEventListener('click', () => {
        dropdownElement.classList.toggle('hidden');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    applyEventToFilterBtn();
    applyEventToSortByBtn();
});
