# Until After

## How to Run
1. `git clone url`
2. `npm install`
3. `npm install nodemon`
3. `nodemon`

## Routes

- User Routes
    - GET Signup
    - GET Login
    - POST Signup
    - POST Login
    - GET Logout

- Journal Routes
    - GET '/' (shows latest journal's entry)
    - GET '/journal/:journalIndex/:entryIndex' (Shows specific entry at specific journal)
    - GET '/dashboard' (Shows all user entries)
    - POST '/imalive/:id' (User alerts that they are alive)
    - PUT '/saveJournalEntry' updates Users Journal's Entry in realtime.
    - POST 'newEntryInJournal' creates a new entry

- Request Routes
    - GET '/:id/requestAccess' (Get specific user access request form)
    - POST '/:id/requestAccess' (Send death verification form to claim user dead)

- Settings Routes

## Services

- Twilio
    - Text
    - Call

- Send Grid
    - Emails