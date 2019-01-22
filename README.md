# Until After
📖 Beautiful private journal that can unlock when you pass away. (Node Express MVC Application)

Website: https://www.untilafter.life

Prelaunch Pitch Deck: http://bit.ly/untilafterprelaunchpitchdeck

This was my Make School Product College Intensive Week Hackathon project, ideated, designed, and built the MVP in one week. Until After was chosen as one of the top 10 projects at Make School. 

Milestones:
- [X] Integrating Twilio text API
- [X] Locking users journal until death verified. 
- [X] Allowing authorized users to submit proof death for account access
- [X] Allowing users to add other users with ability to request access
- [X] Auto Save journal text in realtime
- [X] Dashboard view of all journals
- [X] Creating user settings page
- [X] User authentication

Future To Do's:
- [ ] Creating an appealing home page.
- [ ] Unit testing all routes
- [ ] Allowing users to upload voice recordings, videos and images stored on AWS S3.
- [ ] Implement Socket.io on journal to reduce API calls.
- [ ] Finish new dashboard of journal UI
- [ ] Create system to ping users for daily emotions
- [ ] Allow users to upload life defining moments.
- [ ] Create a contact support form
- [ ] Write terms of agreement / conditions
- [ ] Develop authorized admin panel to view and edit users and account requests
- [ ] Integrate React to create native iOS and Android application for mobile users ease of access.
- [ ] Implement Stripe API for premium memberships.
- [ ] Integrate Passport.js to ping users across all social media apps.
- [ ] Finish implementing all the proper text and email settings
- [ ] Create a logo

*Estimated beta launch date:* **June 1st, 2019**

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