function getErrorMsg(errorState, fieldName, constraints)
{
    if ((errorState.isValid === true) || (errorState.reason === 'none')) return '';
    
    switch (errorState.reason) {
        // General error reasons
        case 'empty' : return `${fieldName} cannot be empty.`;

        // Text input reasons
        case 'characterOverflow' : return `${fieldName} cannot be longer than ${constraints.max_len}.`;

        // Radio btn reasons
        case 'invalidOption' : return `Option chosen for ${fieldName} is invalid.`;
    }
}

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

function setTextOfFieldErrorContainer(errorObj, constraints, fieldName, errorTextContainer) {
    const errorMsg = getErrorMsg(errorObj, fieldName, constraints)
    errorTextContainer.textContent = errorMsg;
}

function verifyTextInput(textInput, constraints) {
    // Check if element isn't null
    if (!textInput) {
        return {isValid : false, reason : 'empty'};
    }

    // Check if length matches constraints
    const contentLength = textInput.value.trim().length;

    if (contentLength == 0) {
        return {isValid : false, reason : 'empty'};
    }

    if ((constraints.max_len != -1) && (contentLength > constraints.max_len)) {
        return {isValid : false, reason : 'characterOverflow'};;
    }

    return {isValid : true, reason : 'none'};
}

function verifyRadioBtns(radioInput, constraints) {
    // Check if user selected a radio button
    const selectedRadioBtn = document.querySelector(`input[name=${radioInput.name}]:checked`);

    if (!selectedRadioBtn) {
        return {isValid: false, reason: 'empty'}; 
    }

    // If the chosen value of the radio btn isn't in the constraints
    if (!constraints.options.includes(selectedRadioBtn.value)) {
        return {isValid: false, reason: 'invalidOption'};
    }

    return {isValid: true, reason: 'none'};
}

function verifyField(inputElement, constraints) {
    if (!constraints.required)
        return {isValid : true, reason : 'none'};

    switch (inputElement.type) {
        case 'text':
        case 'textarea':
            return verifyTextInput(inputElement, constraints);
        case 'radio':
            return verifyRadioBtns(inputElement, constraints);
    }   
}

function verifyForm(fieldIdsToIgnore)
{
    const backendNote = document.getElementById('secret-note');
    const backendPageData = JSON.parse(backendNote.textContent);
    const fieldsDataFromBackend = backendPageData['fieldData'];

    // ID of each field i'm verfiying, their key's are their constraints
    const fieldsToValidate = [
        {
            id: 'blog-title',
            name: 'Title',
            type: 'text',
            backendKey: 'blog_title'
        },
        {
            id: 'blog-description',
            name: 'Description',
            type: 'textarea',
            backendKey: 'blog_description'
        },
        {
            id: 'blog-tag',
            name: 'Tag',
            type: 'radio',
            backendKey: 'blog_tag'
        },
        {
            id: 'blog-content',
            name: 'Content',
            type: 'textarea',
            backendKey: 'blog_content'
        },
    ];

    // Verifying time i guess. man this sucks absolute ass.
    let isFormValid = true;

    for (const field of fieldsToValidate) {
        const input = document.getElementById(field.id);
        const error_text_container = document.getElementById(field.id + '-error-text-tag');
        const constraints = fieldsDataFromBackend[field.backendKey];
        const fieldErrorState = verifyField(input, constraints);     
        
        // if field is valid. it removes the text. if there is an error, sets the text to that.
        setTextOfFieldErrorContainer(fieldErrorState, constraints, field.name, error_text_container);

        if (!fieldErrorState.isValid) {
            isFormValid = false;
            applyErrorStylesToInput(input);
            continue;
        }
        
        removeErrorStylesFromInput(input, error_text_container);
    }

    return isFormValid; 
}

function onblogFormSubmit(event) {
    // if (!verifyForm())
    //     event.preventDefault();
}

function addEventToblogForm()
{
    const blogForm = document.getElementById('blog-form');

    if (blogForm)
    {
        blogForm.addEventListener("submit", (event) => {
            onblogFormSubmit(event);
        });
    }
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

    const contentTextArea = document.getElementById('blog-content');
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

    const markdownInputhtml_id = 'blog-content';
    const htmlOutputhtml_id = 'blog-content-markdown-preview';

    const markdownInput = document.getElementById(markdownInputhtml_id);
    const htmlOutput = document.getElementById(htmlOutputhtml_id);

    markdownInput.addEventListener('keyup', () => {
        renderMarkdown(markdownInput, htmlOutput);
    });

    renderMarkdown(markdownInput, htmlOutput);
}

// Check if backend encountered any errors.
function initializeFormWithBackendData() {
    const backendNote = document.getElementById('secret-note');
    const backendPageData = JSON.parse(backendNote.textContent);
    const fieldsDataFromBackend = backendPageData['fieldData'];

    for (const field of Object.entries(fieldsDataFromBackend)) { 

        const fieldToInitialize = field[1];

        if (fieldToInitialize.type === 'textarea' 
        || fieldToInitialize.type === 'text') {
            const valueToSet = fieldToInitialize['value'];
            document.getElementById(fieldToInitialize['html_id']).value = valueToSet;
        }

        else if (fieldToInitialize.type === 'radio') {
            // mark the input with specified value as checked
            const selector = `input[type="radio"][value="${fieldToInitialize.value}"]`;
            const radioInputToSelect = document.querySelector(selector);

            if (radioInputToSelect) {
                radioInputToSelect.checked = true;
            }
        }

        else if (fieldToInitialize.type === 'checkbox') {
            const checkBoxToSet = document.getElementById(fieldToInitialize.html_id);
            
            if (checkBoxToSet) {
                checkBoxToSet.checked = fieldToInitialize.value;
            }
        }
    }
 
    // Initialize errors if post
    if (backendPageData.didUserSubmit) {
        verifyForm();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeFormWithBackendData();
    addEventToblogForm();
    addEventListenerToblogContentField();
});