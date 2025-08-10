function applyHideAncestors() {
  const clickableElementClass = ".js-hide-ancestor";
  const ancestorToDeleteClass = ".ancestor-to-hide";
  const elementsClickable = document.querySelectorAll(clickableElementClass);

  for (const element of elementsClickable) {
    element.addEventListener("click", function () {
      const ancestorToDelete = this.closest(ancestorToDeleteClass);

      if (ancestorToDelete) {
        ancestorToDelete.classList.add("hidden");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyHideAncestors();
});
