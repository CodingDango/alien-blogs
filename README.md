# Shit I Should Do

## Refine the footer subscribe

- Make the ufo2 image go behin IM DONE WITH THIS. THIS IS GOOD ENOUGH
- Make it white and transparent IM DONE WITH THIS. THIS IS GOOD ENOUGH
- If the user is already logged in, just hide it, by default we will use their email.
- If the user isn't logged in, it will be a simple email collection form.

## Refine the header design.

- Right now, I honestly do not like the navbar design. extremely boring.
I need to add some interactivity and pictures icons before them.
instead of the nav links being centered.
I would like to remove the redundant Outsider Blogs text and just include the icon as the main selling point.
Then, next to the logo, will be our

## Login or Sign Up pages

- Create another app for django? call it users.
  - Database model will include
    - username
    - email
    - password
    - is_subscribed
    - and in the future, maybe a link to the profile picture. for now, in the readblog, it will have a placeholder picture.

- Create a template for login
- Create a template for sign up

- Remember, in the nav. if the user is logged in, show a log out. if they aren't logged in, show login and sign up links.

## Read blog page

- Make the dates more dynamic
  - I would have to change the database, maybe delete everything in it,
  - I need a date when it was posted
  - and a date on when it was last updated.
  - The format is M D, Y
  - The author needs to also be dynamic.
  - Right now, it looks so damn dull. Only white colors. how in the world do i give it color to the text? this is ass.
  