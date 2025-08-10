function getBlogs() {
  const blogsData = document.getElementById("blogs_data").textContent;
  const blogs = JSON.parse(blogsData);

  return blogs;
}

function getFeaturedBlogId() {
  const featuredBlogIdData = document.getElementById("featuredBlogId").textContent;
  const featuredBlogId = JSON.parse(featuredBlogIdData);

  return featuredBlogId;
}

function capFirst(str) {
  if (!str) return str;

  return str.at(0).toUpperCase() + str.slice(1);
}

function getBlogCardHTML(blog) {
  const blogDate = new Date(blog.date_created);
  const formattedDate = blogDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const blogCardHTML = `
          <article>
            <div class="relative group group-focus-within:ring-2 ring-white ring-offset-1 ring-offset-black rounded-md flex flex-col pb-5">
              <a href="/blogs/${blog.id}">
                <span class="sr-only">Read more about ${blog.title}</span>

                <div>
                  <img src="/static/imgs/placeholder.jpg" class="object-cover min-h-[300px] max-h-[300px] w-full rounded-md">
                </div>

                <!-- Tag -->
                  <p 
                    class="absolute top-2 left-2 px-4 py-2 rounded-3xl bg-zinc-700/60 text-white"
                  >${capFirst(blog.tag)}</p>

                <div class="flex flex-col gap-y-3">
                  <!-- Date of creation -->
                  <p class="mt-2 text-gray-400 flex gap-x-3 items-center">
                    <span>${formattedDate}</span>
                    <span class="ml-auto">10 mins read</span>
                  </p>

                  <!-- Blog content -->
                  <div class="flex flex-col gap-y-2">
                    <h3 
                      class="text-2xl text-white line-clamp-2"
                    >${blog.title}</h3>
                    
                    <!-- Blog description -->
                    <p class="text-gray-400 line-clamp-2">${
                      blog.description
                    }</p>
                  </div>
                </div>
              </a>
            </div>

            <!-- Author --> 
            <a href="/user" class="z-10">
              <div class="flex gap-x-3 items-center">
                <img 
                  src="/static/imgs/cat.jpg"
                  class="w-[40px] h-[40px] object-cover rounded-full"
                >
                <p class="text-white">${blog.author.first_name} ${
    blog.author.last_name
  }</p>
              </div>
            </a>
          </article>`;

  return blogCardHTML;
}

function toUnselectedClassForFilterBtn(filterBtn) {
  filterBtn.classList.remove("text-black");
  filterBtn.classList.remove("bg-white");
  filterBtn.classList.add("hover:bg-white/10");
  filterBtn.classList.add("text-white");
}

function toSelectedClassForFilterBtn(filterBtn) {
  filterBtn.classList.add("text-black");
  filterBtn.classList.add("bg-white");
  filterBtn.classList.remove("hover:bg-white/10");
  filterBtn.classList.remove("text-white");
}

function filterBlogsByTag(tag) {
  const lowerCasedTag = tag.toLowerCase();
  const filtered = [];

  for (const blog of all_blogs) {
    if (blog.tag.toLowerCase() === lowerCasedTag || tag === "all") {
      filtered.push(blog);
    }
  }

  return filtered;
}

function sortBlogsByMode(blogs, mode) {
    const blogsToSort = structuredClone(blogs);

    switch (mode) {
        case 'newest':
            return blogsToSort.sort(
                (blog1, blog2) => { 
                    return new Date(blog2.date_created) - new Date(blog1.date_created)  
                }
            );

        case 'oldest':
            return blogsToSort.sort(
                (blog1, blog2) => { 
                    return new Date(blog1.date_created) - new Date(blog2.date_created)
                }
            );
    }
} 

function getActiveSortingModeForBlogs() {
    const currentSortMode = document.getElementById('sort-by-active')?.textContent?.toLowerCase();
    return currentSortMode || 'all';
}

function renderBlogs(blogsToRender) {
  const blogsContainer = document.getElementById("blogs-container");
  blogsContainer.innerHTML = "";

  blogsToRender.forEach((blog) =>
    { blogsContainer.insertAdjacentHTML("beforeend", getBlogCardHTML(blog)) }
  );
}

function checkForClickOnBlogControlsMobile(event) {
  const blogControlsContainer = event.target.closest('#filter-controls-container-mobile');
  const filterBtn = event.target.closest("button") || event.target;

  if (!blogControlsContainer || !(filterBtn instanceof HTMLButtonElement))
    return;

  currentFilter = filterBtn.value.toLowerCase();

  updateBlogDisplay();
}

function checkForClickOnBlogControlsDesktop(event) {
  const blogControlsContainer = event.target.closest(
    "#filter-controls-container-desktop"
  );
  const filterBtn = event.target.closest("button") || event.target;

  if (!blogControlsContainer || !(filterBtn instanceof HTMLButtonElement))
    return;

  // Unselect all buttons
  blogControlsContainer.querySelectorAll("button").forEach((element) => {
    toUnselectedClassForFilterBtn(element);
  });

  currentFilter = filterBtn.value.toLowerCase();

  toSelectedClassForFilterBtn(filterBtn);
  updateBlogDisplay();
}

function checkForClickOnSortByBtns(event) {
  const sortByControlsContainer = event.target.closest("#sort-by-dropdown");
  const sortByBtn = event.target.closest("button") || event.target;

  if (!sortByControlsContainer || !(sortByBtn instanceof HTMLButtonElement)) {
    return;
  }

  // Update active sort
  const activeSortElement = document.getElementById("sort-by-active");
  activeSortElement.textContent = sortByBtn?.value;

  updateBlogDisplay();
}

function updateBlogDisplay() {
    const sortingMode = getActiveSortingModeForBlogs();
    const filteredBlogs = filterBlogsByTag(currentFilter);
    const sortedBlogs = sortBlogsByMode(filteredBlogs, sortingMode);

    renderBlogs(sortedBlogs);
}

let all_blogs = [];
let currentFilter = 'all';

document.addEventListener("DOMContentLoaded", () => {
  const featuredBlogId = getFeaturedBlogId();
  all_blogs = getBlogs().filter((blog) => { return blog.id !== featuredBlogId });

  document.addEventListener("click", (event) => {
    // Blog controls events
    checkForClickOnBlogControlsDesktop(event);

    // Mobile
    checkForClickOnBlogControlsMobile(event);

    // Sort by events
    checkForClickOnSortByBtns(event);
  });
});
