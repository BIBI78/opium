slatt00

# OPIUM

Opium just wants to make it simple for producers, rappers and fans of music to cut through the nonsense of social media
and get to straight to the MUSIC.

- The repository for the DRF-API associated with this project is available [HERE](https://github.com/BIBI78/drf_api). The installation, set up, and deployment steps for this section of the project have also been included in the README linked to the DRF-API.

#### DEPLOYED BACKEND API RENDER [LINK]()

#### DEPLOYED FRONTEND RENDER [LINK - LIVE SITE]()

#### DEPLOYED BACKEND GITHUB [REPOSITORY]()

![Site view across devices](src/assets/images-readme/readme-amiresponsive.png)

The live link for "The Red Crayon" can be found [HERE](https://project5-red-crayon.onrender.com)

## Table of Contents

- [UX](#ux "UX")
  - [Site Purpose](#site-purpose "Site Purpose")
  - [Site Goal](#site-goal "Site Goal")
  - [Audience](#audience "Audience")
  - [Communication](#communication "Communication")
  - [Current User Goals](#current-user-goals "Current User Goals")
  - [New User Goals](#new-user-goals "New User Goals")
- [User Stories](#user-stories "User Stories")
  - [Admin stories](#admin-stories "Admin stories")
  - [Artist stories](#artist-stories "Artist stories")
  - [Visitor stories](#visitor-stories "Visitor stories")
- [Design](#design "Design")
  - [Colour Scheme](#colour-scheme "Colour Scheme")
  - [Typography](#typography "Typography")
  - [Imagery](#imagery "Imagery")
- [Features](#features "Features")
  - [Existing Features](#existing-features "Existing Features")
  - [C.R.U.D](#crud "C.R.U.D")
- [Testing](#testing "Testing")
  - [Validator Testing](#validator-testing "Validator Testing")
  - [Unfixed Bugs](#unfixed-bugs "Unfixed Bugs")
- [Technologies Used](#technologies-used "Technologies Used")
  - [Main Languages Used](#main-languages-used "Main Languages Used")
  - [Frameworks, Libraries & Programs Used](#frameworks-libraries-programs-used "Frameworks, Libraries & Programs Used")
- [Components](#oomponents "Components")
- [Deployment](#deployment "Deployment")
- [Credits](#credits "Credits")
  - [Content](#content "Content")
  - [Media](#media "Media")

## UX

### Site Purpose:

Opium is a simple music sharing app. The purpose is to share music with your peers wherever you are and get feedback.

### Site Goal:

The goal of Opium is tpo get people to share beats and give feedback and make connections.

### Audience:

Everyone who enjoys sharing music.

### Communication:

The layout is straightforward: The main content ( the music ) is the center piece. Navigation is at the top and everything else is kept to the side.

### Current User Goals:

The goal is to build a new community that is all about sharing/making/talking about music.

### New User Goals:

The user shouldnt be mindlessly scrolling but listeing to all the beats and reacting.

### Future Goals:

- Provide more ways for the user to intereact with the app: For example remixing a beat in the app or rapping on the beat and uploading it in the comments.
- Create a messaging feature.
- Create a way for user to sell beats and services.

## User Stories

Here are the links to the [GitHub Issues](https://github.com/CluelessBiker/project5-red-crayon/issues) for this project, as well as the [KANBAN board](https://github.com/users/CluelessBiker/projects/2).

Please also find a full list of the Epics, User stories, & story points typed up [HERE](src/assets/userstories.md).

## Design

### Wireframes:

##### Home Page - Desktop:

![Desktop Home](src/assets/images-readme/readme-wireframe-home.png)

##### Home Page - Mobile:

![Desktop Mobile](src/assets/images-readme/readme-wireframe-mobile.png)

##### Form Page:

![Form Page](src/assets/images-readme/readme-wireframe-form.png)

##### Site Navigation:

![Site Navigation](src/assets/readme/nav1.png)

### Colour Scheme:

![Colour Palette](src/assets/readme/palette.png)

### Typography:

All fonts were obtained from the Google Fonts library. I chose the following fonts for the page:

1. Noto, for the majority of the site
2. Archivo Black for the Navbar
3. Kanit , but rarely.

## Features

### Existing Features:

#### Header:

![Header](src/assets/readme/header.png)

##### URl Tab

![URL TAB](src/assets/readme/logo_tab.png)

##### Navigation - Desktop:

![Navbar desktop](src/assets/readme/navigation-desktop.png)

##### Navigation - Mobile:

![Navbar mobile](src/assets/readme/navigation-iphone1.png)
![Navbar mobile](src/assets/readme/navigation-iphone2.png)

#### About Page:

![About Page](src/assets/readme/about.png)

#### Feedback form (buttons):

![Feedback buttons (fire)](src/assets/readme/firefeedback.png)
![Feedback buttons (trash) ](src/assets/readme/trashfeedback.png)

#### Star Rating :

![Star Rating ](src/assets/readme/rating_form.png)
![Star Rating 2 ](src/assets/readme/rating_form_2.png)

#### 404 Page Not Found:

![404 Page Not Found](src/assets/readme/404.png)

#### Popular Profiles:

![Popular Profiles](src/assets/images-readme/readme-populareprofiles.png)

#### Social Links:

###### \*at the bottm of the about page

![Social Links](src/assets/readme/sociallinks.png)

#### Log in, Log out & Sign up:

##### Login:

![Login](src/assets/readme/login.png)

##### Logout:

![Logout](src/assets/readme/logout.png)

##### Sign-up:

![Sign-up](src/assets/readme/signup.png)

### Features Left to Implement:

- In app remixing ( I want the user to be able to slow down speed up beats and add vocals)
- The ability see the best and worst beats ( beats with the most postive/negative feedback)
- In app bidding( users should be able to sell beats to other users)
- Notifications ( typical app notifcations ,new follwoer , new like , new comment etc, favorite users new posts).
- Some sort of private messaging , direct messages,maybe even group chats.
- Music wave when the beat starts playing .
- Longer MP3 uploads

## Testing

### Manual Testing:

##### \* There was an incredible amount of testing and this revealed several problems

1. Mp3 upload :

- Resolved by rewriting the whole.

2. 500 server error:

- Resolved with the aid of tutor support. All database migrations for both the Django project & apps needed to be cleared & remigrated. The precise steps for this have been documented in the README for the deployed backend API.

3. CRUD functionality has been tested for each of the following: Posts | Articles | Events | Comments | Likes | Follow | Profile

- Likes & Follow may only be created & deleted
- Profile may only be updated

4. All nav links open to the correct page.
5. All external links open to a new browser window.
6. Pages intended for logged-in users only will redirect logged-out users back to the home page.
7. Users attempting to edit content that they did not publish are redirected back to the home page.
8. Users are able to create a new account.
9. Users with an existing account are able to log in.
10. Each user has the ability to log out.

### Validator Testing

1. CSS files pass through the [Jigsaw validator](https://jigsaw.w3.org/css-validator/) with no issues found.

![Jigsaw validator message](src/assets/images-readme/readme-w3c.png)

2. a. Javascript files pass through [ESLint](https://eslint.org/). The following issues were raised, and have been intentionally ignored as they are in relation to code that was provided in the Moments Walkthrough project:

- Props spreading is forbidden
- Do not pass children as props.
- Do not use Array index in keys
- 'a_name' is already declared in the upper scope
- Expected an assignment or function call and instead saw an expression
- Do not nest ternary expressions
- Fragments should contain more than one child

2. b. Additionally, this error has also been ignored:

- Identifier 'field_name' is not in camel case
- - relates to a database field in the API, case cannot be changed for this reason.

2. c. All instances of errors where a newline has been asked for within an opening & closing set of tags, eg:

- `<p>{owner} doesn't like the {drink}</p>` should be written as:

```
<p>
  {owner}
  {' '}
  doesn't like this
  {' '}
  {drink}
</p>
```

- This particular rule does not lend to the readability of the code, & instead hinders it (in my opinion).

2. d. All `console.log(err);` have been left in place & commented out, as it was suggested that this is also done in real-world scenarios.
3. e. Added all files affected by the above, unresolved warnings to `.eslintignore`, as well as added the following line to the top of each individual file, `/* eslint-disable */` to allow for a successful deployment on Heroku.

4. The page has an excellent Accessibility rating in Lighthouse:

![Accessibility score](src/assets/images-readme/readme-lighthouse.png)

4. Tested the site opens in Brave, Chrome, Safari & on a mobile device without issues.

5. All social links open to external pages as intended.

### Unfixed Bugs

1. I have not been able to get the NavBar to be as seemless as I would like.

2. When I started this project I wanted the user to be able to upload full songs ( mp3s up to 3 minutes at least ), I never figured out how to to do that.

3. THESE ARENT REALLY BUGS COME BACK TO THIS

## Technologies Used

### Main Languages Used

- HTML5
- CSS3
- Javascript
- Python
- SQL - Postgres

### Frameworks, Libraries & Programs Used

- Google Fonts : For the site fonts.
- Font Awesome : To add icons to the social links in the footer & navigation sections.
- GitPod : To build the project & create the JSX & CSS files before pushing the project to Github.
- GitHub : To store my repository for submission.
- Balsamiq : Was used to create mockups of the project prior to starting.
- Am I Responsive? : To ensure the project looked good across all devices.
- Favicon : To provide the code & image for the icon in the tab bar.
- Django : Used to build the backend database that serves as an API for the front-end project.
- React-Bootstrap : The styling library that has aided to the layout of the site, and which was introduced to us during the course of the program.
- DrawSQL : An interactive tool that allows for the creation of Database mock-ups so that we can visualise the relationships between models.
- ReactJS : To build the components that would collectively form the front-end application.

## Components

Several components have been implemented within this project that have been reused throughout the project:

1. axiosDefault.js : for ease of communication with the backend API.
2. Asset.js : to supply the loading spinner & user avatar throughout the site.
3. DropdownMenu.js : to allow users to edit/delete their Articles, Events & Posts.
4. CurrentUserContext.js : confirm users logged-in status to determine what functionality is available to that user.
5. ProfileDataContext.js : provide un/follow ability to other users across PopProf & ProfPage components.
6. ToggleCollapse.js : whilst this component has only been applied to the NavBarMini, it could in theory be applied to additional dropdown menus installed into the site in the future to allow for the automatic collapse of an element upon mouse click.
7. useRedirect.js : redirects a user to another page if they are not authorised to be on the page they are trying to access.
8. utils.js : supplies functionality to all of the components that utilise the Infinite Scroll.

## Deployment

The site was deployed to Heroku. The steps to deploy are as follows:

1. Launch the gitpod workspace.
2. Install ReactJS:

```
npx create-react-app . --use-npm
npm start
```

2. Install the following packages using the command `npm install`:

```
react-bootstrap@1.6.3 bootstrap@4.6.0
react-router-dom@5.3.0
axios
react-infinite-scroll-component
msw --save-dev
jwt-decode
-g eslint
```

3. Git add, commit, and push changes to gitpod.
4. Create the project app on Heroku, and link the GitHub repository by navigating to the 'Deploy' tab.

### Connecting to the API:

1. Navigated to the Heroku app of the project DRF-API, and under the Settings tab, added the following configvars:

- Key: CLIENT_ORIGIN | Value: https://react-app-name.herokuapp.com
- Key: CLIENT_ORIGIN_DEV | Value: https://gitpod-browser-link.ws-eu54.gitpod.io

2. Check that the trailing slash `\` at the end of both links has been removed, and save the configvar pairs.
3. Install the Axios package, & create supporting `axiosDefaults.js` as shown in [Moments Walkthrough](https://github.com/Code-Institute-Solutions/moments/blob/cf955d2f2e6f70f61c92d1f9de85558d8e49f3a8/src/api/axiosDefaults.js).

### Deploy to Heroku:

1. In the `scripts` section of `package.json` in gitpod, added the following command:

```
"heroku-prebuild": "npm install -g serve",
```

2. Add Procfile to project root & populate with the following:

```
web: serve -s build
```

3. Repeat the steps of git add/commit/push.
4. Deploy the project via the deploy button on Heroku.

### Deploy to Render & ElephantSQL:

- Due to Heroku revoking their frie tier access, the project has been redeployed using (Render)[https://render.com/] & (ElephantSQL)[https://www.elephantsql.com/] using the following [instructions](https://code-institute-students.github.io/deployment-docs/41-pp5-adv-fe/pp5-adv-fe-drf-01-create-a-database)

## Credits

### Content

- Code Institute: The creation of the project came to life by utilising the Moments walkthrough step-by-step as a base foundation, and then building upon it to make the project my own. This is evident from the numerous docstrings within my files crediting the walkthrough.

- [LAUREN MENTOR](https://github.com/CluelessBiker): I could not have wished for a better mentor. 

### Media

- 404 Error Graphic from [PNG Tree](https://pngtree.com/freepng/404-error-interface-art-word-design_4043816.html)
- Images for the Articles, Events & Posts made on the site have been accumulated from numerous sources on Twitter & Instagram. I do not have the information of the original content creator for these memes.
