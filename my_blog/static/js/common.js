function applyDeleteAncestors() {
    const clickableElementClass = '.js-delete-ancestor'
    const ancestorToDeleteClass = '.ancestor-to-delete'
    const elementsClickable = document.querySelectorAll(clickableElementClass);

    for (const element of elementsClickable) {
        element.addEventListener('click', function() {
            const ancestorToDelete = this.closest(ancestorToDeleteClass)
    
            if (ancestorToDelete) {
                ancestorToDelete.remove();
            }
        });
    }
}

// Function for closing parent
document.addEventListener('DOMContentLoaded', () => {
    applyDeleteAncestors();
});

