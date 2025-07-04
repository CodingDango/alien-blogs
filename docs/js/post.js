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
        postField.reasonIsInvalid = "characterOverflow";
}

function verifyPostForm(postFields)
{   
    for (const field of postFields) 
    {
        const fieldElement = document.getElementById(field.htmlID);

        // Find an invalid msg if there is one.
        identifyInvalidReasonForField(fieldElement, field);

        if (field.invalidReason === "none")
            resetElementErrState(fieldElement);
        else
        {
            const errorMsg = getErrorMsg(field);
            enableElementErrState(fieldElement, errorMsg)
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

    return inputName + " can only be " 
      + postField.constraints["maxContentLength"] + " long."
      + " character count is " + contentLength;
}

function areAllFieldsValid(postFields)
{
    for (const field of postFields)
    {
        // If there is an error.
        if (field.invalidReason != "none")
            return false;
    }

    return true;
}

function enableElementErrState(field, errorMsg)
{
    // This is the field
    if (!field.classList.contains('border-red-400'))
        field.classList.add('border-red-400')
    
    if (!field.classList.contains('focus:border-red-400'))
        field.classList.add('focus:border-red-400')
    
    if (field.classList.contains('border-transparent'))
        field.classList.remove('border-transparent')

    // Get the error message, and give it this error message
    field.nextElementSibling.textContent = errorMsg;
}


function resetElementErrState(field)
{
    // This is the field
    if (field.classList.contains('border-red-400'))
        field.classList.remove('border-red-400')
    
    if (field.classList.contains('focus:border-red-400'))
        field.classList.remove('focus:border-red-400')
    
    if (!field.classList.contains('border-transparent'))
        field.classList.add('border-transparent')

    // Get the error message, and empty it
    field.nextElementSibling.textContent = '';
}

function onPostFormSubmit(event)
{
    let postFields = [
      new PostField("post-title", "Title", 50),
      new PostField("post-description", "Description", 100),
      new PostField("post-content", "Content", -1),
    ];
    
    verifyPostForm(postFields);

    if (areAllFieldsValid(postFields))
        return;
    
    event.preventDefault();
}

document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById('post-form');

    if (postForm)
    {
        postForm.addEventListener("submit", (event) => {
            onPostFormSubmit(event);
        });
    }
});