function applyErrorStylesToInput(input)
{
    // Toggle field styles
    safeAddClassesToElement(input, ['border-red-400', 'focus:border-red-400']);
    safeRemoveClassesFromElement(input, ['focus:border-neon-purple', 'border-transparent']);
}

function removeErrorStylesFromInput(input)
{
    // Toggle field styles
    safeRemoveClassesFromElement(input, ['border-red-400', 'focus:border-red-400']);
    safeAddClassesToElement(input, ['border-transparent', 'focus:border-neon-purple']);
}

// For the content field.
function safeRemoveClassesFromElement(element, classesToRemove)
{
    for (const classStr of classesToRemove)
    {
        if (element.classList.contains(classStr))
            element.classList.remove(classStr);
    }
}

// Prevents duplicates.
function safeAddClassesToElement(element, classesToAdd)
{
    for (const classStr of classesToAdd)
    {
        if (!element.classList.contains(classStr))
            element.classList.add(classStr);
    }
}

function handleClassesForViewBtnSelections(viewToSwitch)
{
    const classListForSelectedBtn = [
        'text-my-lime',
        'border-my-lime'
    ]

    const classListForUnselectedBtn = [
        'text-gray-400',
        'border-gray-500'
    ];

    const writeBtnElem = document.getElementById('content-write-btn');
    const previewBtnElem = document.getElementById('content-preview-btn');

    let btnToSelect = null;
    let btnToDeselect = null;

    if (!writeBtnElem || !previewBtnElem)
        return;

    if (viewToSwitch === 'write')
    {
        btnToSelect = writeBtnElem;
        btnToDeselect = previewBtnElem;
    }
    else
    {
        btnToSelect = previewBtnElem;
        btnToDeselect = writeBtnElem;
    }

    // Remove unselected classes from btn to select and
    // Apply selected classes to it.
    safeRemoveClassesFromElement(btnToSelect, classListForUnselectedBtn);
    safeAddClassesToElement(btnToSelect, classListForSelectedBtn);

    // Remove selected classes from btnToDeseelct
    // And apply unselected classes to it
    safeRemoveClassesFromElement(btnToDeselect, classListForSelectedBtn);
    safeAddClassesToElement(btnToDeselect, classListForUnselectedBtn);
}

function blogContentSwitchView(viewToSwitch)
{
    handleClassesForViewBtnSelections(viewToSwitch);

    const contentTextArea = document.querySelector('[data-blog-content="true"]');
    const contentMarkdownPreview = document.getElementById('blog-content-markdown-preview')
    const contentMarkdownPreviewContainer = contentMarkdownPreview.parentElement;

    if (!contentTextArea || !contentMarkdownPreview)
        return;

    if (viewToSwitch === 'preview' && (!contentTextArea.classList.contains('invisible')))
    {
        contentTextArea.classList.add('invisible');
        contentMarkdownPreviewContainer.classList.remove('invisible');
    }

    else if (viewToSwitch === 'write' && (!contentMarkdownPreviewContainer.classList.contains('invisible')))
    {
        contentMarkdownPreviewContainer.classList.add('invisible');
        contentTextArea.classList.remove('invisible');
    }
}

// Markdown render
function renderMarkdown(markdownInput, htmlOutput) {
    const markdownText = markdownInput.value;
    htmlOutput.innerHTML = marked.parse(markdownText);
}

function addEventListenerToblogContentField()
{
    marked.setOptions({
        breaks : true
    });

    const markdownInputhtmlSelector = '[data-blog-content="true"]';
    const htmlOutputhtml_id = 'blog-content-markdown-preview';

    const markdownInput = document.querySelector(markdownInputhtmlSelector);
    const htmlOutput = document.getElementById(htmlOutputhtml_id);

    markdownInput.addEventListener('keyup', () => {
        renderMarkdown(markdownInput, htmlOutput);
    });

    renderMarkdown(markdownInput, htmlOutput);
}

document.addEventListener("DOMContentLoaded", () => {
    addEventListenerToblogContentField();
});