function initializeBlogPopUp(id, blogTitle) {
    const popUp = document.getElementById('delete-blog-pop-up');
    const textTag = popUp.querySelector('#delete-blog-pop-up-blog-name');
    textTag.innerText = blogTitle || 'this blog.';

    const form = popUp.querySelector('form');
    const actionUrl = `/blogs/delete/${id}`;
    form.action = actionUrl;
}

function showDeleteBlogPopUp() {
    document.getElementById('delete-blog-pop-up')?.classList.remove('hidden');
}

function addEventsToDeleteBlogButton() {
    const popUpTogglerSelector = "[data-toggle='deleteBlogPopUp']";

    document.querySelectorAll(popUpTogglerSelector).forEach(toggler => {
        toggler.addEventListener('click', event => {
            const deleteBtn = event.target.closest(popUpTogglerSelector);

            if (deleteBtn) {
                initializeBlogPopUp(
                    deleteBtn.getAttribute('data-blog-id'),
                    deleteBtn.getAttribute('data-blog-title')
                );
                showDeleteBlogPopUp();
            }
        });
    });

}

document.addEventListener('DOMContentLoaded', () => {
    addEventsToDeleteBlogButton();
});