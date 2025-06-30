function verifyPostForm(fieldIDs, fieldConstraints)
{   
    // Keys are the id of the html inputs
    // reason is invalid can be 'empty' or 'max-len' or 'none'
    let fieldStatuses = {
      [fieldIDs[0]] : {
        "label" : "Title",
        "status": {
          "isValid" : false,
          "reasonIsInvalid" : "empty"
        }
      },
      
      [fieldIDs[1]] : {
        "label" : "Short description",
        "status": {
          "isValid" : false,
          "reasonIsInvalid" : "empty"
        },
      },
      
      [fieldIDs[2]] : {
        "label" : "Blog content",
        "status": {
          "isValid" : false,
          "reasonIsInvalid" : "empty"
        }
      },
    }

    const postForm = document.getElementById('post-form')

    // If post form is gone return as all fields are empty
    if (!postForm) {
        return fieldStatuses
    }

    for (const keyID in fieldStatuses) {
        const field = document.getElementById(keyID)

        // Treat as if empty input.
        if (!field)
            continue;

        // Check content
        const fieldContent = field.value.trim()
        
        if (fieldContent.length == 0) 
            continue;

        // If fieldContent is greater than max len
        // Also, if fieldconstraint max len is negative one, ignore.
        if (fieldConstraints[keyID]['max-len'] != -1 && fieldContent.length > fieldConstraints[keyID]['max-len'])
        {
          fieldStatuses[keyID]['status']['reasonIsInvalid'] = 'max-len'
          continue;
        }
        
        // Valid input!
        fieldStatuses[keyID]['status']['isValid'] = true;
        fieldStatuses[keyID]['status']['reasonIsInvalid'] = 'none';
    }

    return fieldStatuses
}

function areAllFieldStatusesValid(fieldStatuses)
{
    for (const fieldID in fieldStatuses)
    {
        // If there is an error.
        if (!fieldStatuses[fieldID]['status']['isValid'])
            return false;
    }

    return true;
}

function setFieldErrorState(field, error_msg)
{
    // This is the field
    if (!field.classList.contains('border-red-400'))
        field.classList.add('border-red-400')
    
    if (!field.classList.contains('focus:border-red-400'))
        field.classList.add('focus:border-red-400')
    
    if (field.classList.contains('border-transparent'))
        field.classList.remove('border-transparent')

    // Get the error message, and give it this error message
    field.nextElementSibling.textContent = error_msg;
}

function handleFormErrorState(fieldConstraints, fieldStatuses)
{ 
    for (const fieldID in fieldStatuses)
    {
        const invalidReason = fieldStatuses[fieldID]['status']['reasonIsInvalid'];
        const maxContentLength = fieldConstraints[fieldID]['max-len'];
        const inputName = fieldStatuses[fieldID]['label']
        const field = document.getElementById(fieldID);

        // Unhelpful error message, i know.
        let errorMsg = 'Invalid input.';

        if (!fieldStatuses[fieldID]['status']['isValid'])
        {
            if (invalidReason === 'empty' || !field)
            {
                errorMsg = inputName + " cannot not be empty."
            }

            else if (invalidReason === 'max-len')
            { 
                let contentLength = field.value.trim().length;

                errorMsg = inputName + " can only be " 
                  + maxContentLength + "long. "
                  + "character count is " + contentLength;
            }

            setFieldErrorState(field, errorMsg);
        }
        
        // If its valid.
        else
          resetFieldState(field);
    }
}

function resetFieldState(field)
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
    const BLOG_TITLE_INPUT_ID = "post-title"
    const BLOG_DESCRIPTION_INPUT_ID = "post-description"
    const BLOG_CONTENT_INPUT_ID = "post-content"

    const fieldIDs = [
      BLOG_TITLE_INPUT_ID, 
      BLOG_DESCRIPTION_INPUT_ID, 
      BLOG_CONTENT_INPUT_ID
    ]
      
    const fieldConstraints = {
        [BLOG_TITLE_INPUT_ID] : {
          "max-len" : 50
        },

        [BLOG_DESCRIPTION_INPUT_ID] : {
          "max-len" : 180
        },

        [BLOG_CONTENT_INPUT_ID] : {
          "max-len" : -1
        }
    }

    const fieldStatuses = verifyPostForm(fieldIDs, fieldConstraints);

    // If everything is valid,
    if (areAllFieldStatusesValid(fieldStatuses))
        return;
    
    event.preventDefault();
    handleFormErrorState(fieldConstraints, fieldStatuses);
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