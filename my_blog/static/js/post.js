class PostField 
{
    constructor(htmlID, fieldName, maxContentLength)
    {
        this.htmlID = htmlID;
        this.fieldName = fieldName;
        this.invalidReason = "none"; // Meaning it is valid.
        this.constraints = {
          "maxContentLength" : maxContentLength
        };
    }
};

function identifyInvalidReasonForField(postFieldElement, postField)
{
    postFieldElement.invalidReason = "none";

    // If element is missing, treat it as empty input.  
    if (!postFieldElement)
        postField.invalidReason = "empty";
        
    // Check content
    const fieldContent = postFieldElement.value.trim()
    
    if (fieldContent.length == 0) 
        postField.invalidReason = "empty";

    else if (fieldContent.length > postField.constraints["maxContentLength"])
        postField.invalidReason = "characterOverflow";
}

function verifyPostFields(postFields)
{   
    for (const field of postFields) 
    {
        const fieldElement = document.getElementById(field.htmlID);

        // Find an invalid msg if there is one.
        identifyInvalidReasonForField(fieldElement, field);

        if (field.invalidReason === "none")
            resetElementErrState(field, fieldElement);
        else
        {
            const errorMsg = getErrorMsg(field);
            enableElementErrState(field, fieldElement, errorMsg)
        }
    }
}

function getErrorMsg(postField)
{
    if (postField.invalidReason === "none")
        return '';

    if (postField.invalidReason === "empty")
        return postField.fieldName + " cannot not be empty."

    // character overflow.
    const fieldElement = document.getElementById(postField.htmlID);
    let contentLength = 0;

    if (fieldElement)
        contentLength = fieldElement.value.trim().length;

    return postField.fieldName + " can only be " 
      + postField.constraints["maxContentLength"] + " characters long."
      + " current character count is " + contentLength;
}

function areAllFieldsValid(postFields)
{
    for (const field of postFields)
    {
        // If there is an error.
        if (field.invalidReason !== "none")
            return false;
    }

    return true;
}

function enableElementErrState(field, fieldElement, errorMsg)
{
    // This is the field
    if (!fieldElement.classList.contains('border-red-400'))
        fieldElement.classList.add('border-red-400')
    
    if (!fieldElement.classList.contains('focus:border-red-400'))
        fieldElement.classList.add('focus:border-red-400')
    
    if (fieldElement.classList.contains('border-transparent'))
        fieldElement.classList.remove('border-transparent')

    // Get the error message, and give it this error message
    const errorTag = document.getElementById(field.htmlID + '-error-text-tag');
    if (!errorTag) return;

    errorTag.textContent = errorMsg;
}

function resetElementErrState(field, fieldElement)
{
    // This is the field
    if (fieldElement.classList.contains('border-red-400'))
        fieldElement.classList.remove('border-red-400')
    
    if (fieldElement.classList.contains('focus:border-red-400'))
        fieldElement.classList.remove('focus:border-red-400')
    
    if (!fieldElement.classList.contains('border-transparent'))
        fieldElement.classList.add('border-transparent')

    // Get the error message, and empty it
    const errorTag = document.getElementById(field.htmlID + '-error-text-tag');
    if (!errorTag) return;

    errorTag.textContent = '';
}

function verifyForm()
{
    const backendNote = document.getElementById('secret-note');
    const backendPageData = JSON.parse(backendNote.textContent);

    let postFields = [
      new PostField("post-title", "Title", backendPageData['formData']['post_title']['maxLen']),
      new PostField("post-description", "Description", backendPageData['formData']['post_description']['maxLen']),
      new PostField("post-content", "Content", backendPageData['formData']['post_content']['maxLen']),
    ];
    
    verifyPostFields(postFields);

    if (areAllFieldsValid(postFields))
        return true;

    return false;
}

function onPostFormSubmit(event)
{
    // If form isn't valid, prevent submission. 
    if (!verifyForm())
        event.preventDefault();
}

function addEventToPostForm()
{
    const postForm = document.getElementById('post-form');

    if (postForm)
    {
        postForm.addEventListener("submit", (event) => {
            onPostFormSubmit(event);
        });
    }
}

function initializeFormErrors()
{
    // Check if backend encountered any errors.
    const backendNote = document.getElementById('secret-note');
    const backendPageData = JSON.parse(backendNote.textContent);

    let didFormFailBackend = false;

    for (const [fieldName, fieldData] of Object.entries(backendPageData['formData'])) 
    {
        if (fieldData['error'] != 'none')
            didFormFailBackend = true;

        const field = document.getElementById(fieldData['htmlID']);
        field.value = fieldData['value'];
    }

    if (didFormFailBackend)
        verifyForm();
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

    const contentTextArea = document.getElementById('post-content');
    const contentMarkdownPreview = document.getElementById('post-content-markdown-preview')
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

function addEventListenerToPostContentField()
{
    marked.setOptions({
        breaks : true
    });

    const markdownInputHTMLID = 'post-content';
    const htmlOutputHTMLID = 'post-content-markdown-preview';

    const markdownInput = document.getElementById(markdownInputHTMLID);
    const htmlOutput = document.getElementById(htmlOutputHTMLID);

    markdownInput.addEventListener('keyup', () => {
        renderMarkdown(markdownInput, htmlOutput);
    });

    renderMarkdown(markdownInput, htmlOutput);
}

document.addEventListener("DOMContentLoaded", () => {
    initializeFormErrors();
    addEventToPostForm();
    addEventListenerToPostContentField();
});