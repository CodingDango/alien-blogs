# Shit I Should Do

## Small things
- [x] Fix bug when in hamburger menu mode, create blogs and profile pic is visible even when not logged in
- [x] make the search input more smaller in hamburger mode.
- [x] remove the bright green button for search in the search field. use a neutral icon instead.
- [x] Move the Sign out and Profile controls to the hamburger menu. they take too much space.
- [x] when hovered over the profile icon (for now just use a placeholder image) there should be a cursor.
- [x] add hover states for the choices of the dropdown in profile. just a slight bg-white/10
- [x] Fix the ugly looking mobile header mode.

## Large things below
- [x] for desktop version, when clicking, it should have a small drop down menu showing two links. Account and Sign Out.
- [x] Discover a consistent way to create drop down menus using event delegation? and uh, find a way when the cursor clicks on something else the menu closes.
- [x] add the dropdown for the search btn.
- [x] Add a search feature.
    - When searching, it will just list results of Blog titles that match the query.
    - If there are none just display a message saying None.
    - Design this.
- [x] Add functionality to the sorting and filtering.
- [ ] Add an Account.
    - Allows you to edit name, email, and maybe password.
    - Cannot change pfp. I still need to learn how to deal with this.

## Delete functionality (Doable)
- [x] (Design only) Add an edit and trash bin icon to the blog card.
- [x] (Design only) Add an edit and trash bin icon to the read blog view.
- [x] (Javascript) when clicking on the delete button, overlay everything with a transparent black box and a confirmation over it. delete or don't delete?
- [x] (Backend) wrap the delete in a form. create a view for deleting the blog. needs primary key.
- [x] Add it to the featured blogs..

## Edit functionality (Difficult)
- [x] (Backend) when clicking on the edit symbol, it should redirect to a view /blogs/edit/id. only staff is allowed here.
- [x] Create the 4 fields with html only. no fancy css yet.
- [x] (UX) when loading the view, repopulate the 4 fields. the title, description, tag, and content.
- [x] (Backend) find a way to incorporate the modelForm into this?
- [x] Apply the edit.








okay. my plan for this would be-
it should contain controls like edit and delete for each blog card. for now, since i haven't made any permission levels yet? all my user objects are able to uh access this.
in the blogs page there will be controls for edit and delete. pressing the edit will redirect to another url and new view? i guess.
only users that have permission level greater than regularUser can access this right? but how do i imlmement that i wonder.
the fields will be prepopulated by the original value.
we can only edit the title, description, content, and select a new tag (this is a set of radio buttons..)
the checks when submitting include uniqueness of the blog title header. and checks if nothing had ever changed when editing.
Now on the other hand when pressing delete, everything will be behind a slightly transparent black box? like everything. and on top of this box is a rectangle that confirms if the user wants to delete or not.
this two controls will also be present when we choose to READ the blog. not just blog card.
maybe in the future i should implement an admin view? where one can set the permission level of users in the database?
or maybe should i let the django admin app take care of this?
okay uh what do you think..?
