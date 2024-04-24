# OPIUM

Opium just wants to make it simple for producers, rappers and fans of music to cut through the nonsense of social media
and get to straight to the MUSIC.

- The repository for the DRF-API associated with this project is available [HERE](https://github.com/BIBI78/drf_api). The installation, set up, and deployment steps are all in this README doc.

#### DEPLOYED BACKEND API HEROKU [LINK](https://drfa-api-0c6557539d5a.herokuapp.com/)

#### DEPLOYED FRONTEND HEROKU [LINK - LIVE SITE](https://opium-a765be924d82.herokuapp.com/)

#### DEPLOYED BACKEND GITHUB [REPOSITORY](https://github.com/BIBI78/opium)

![Site view across devices](src/assets/readme/amiresponsive.png)

The live link for " O P I U M" [HERE](https://opium-a765be924d82.herokuapp.com/)

## Table of Contents

- [UX](#ux "UX")
  - [Site Purpose](#site-purpose "Site Purpose")
  - [Site Goal](#site-goal "Site Goal")
  - [Audience](#audience "Audience")
  - [Communication](#communication "Communication")
  - [Current User Goals](#current-user-goals "Current User Goals")
  - [New User Goals](#new-user-goals "New User Goals")
- [User Stories](#user-stories "User Stories")
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

Here are the links to the [GitHub Issues](https://github.com/BIBI78/v1/issues) for this project.

## Design

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

![Popular Profiles](src/assets/readme/popular_profiles.png)

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

##### 404 Page NOT FOUND:

![404](src/assets/readme/404_image.png)

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

##### \* There was an incredible amount of testing and this revealed several problems and gaps in my understanding.\*

1. Mp3 upload : At the beginning, I had to conduct extensive testing on the MP3 upload process. I encountered numerous problems and errors in the console, prompting me to repeatedly test and retest uploading the files until I eventually found a satisfactory solution. It was definitly trickier than I initially expected.

2. CRUD functionality has been tested for each of the following: Beats| Feedback buttons | Star rating | Comments | Likes | Follow | Profile

3.

- Likes & Follow may only be created & deleted
- Profile can only be updated
- Ratings cannot be updated

4. All nav links open to the correct page.
5. All external links open to a new browser window.
6. Pages intended for logged-in users only will redirect logged-out users back to the home page.
7. Users attempting to edit content that they did not publish are redirected back to the home page.
8. Users are able to create a new account.
9. Users with an existing account are able to log in.
10. Each user has the ability to log out.

### Validator Testing

1. CSS files pass through the [Jigsaw validator](https://jigsaw.w3.org/css-validator/) with no problems.

![Jigsaw validator message](src/assets/readme/css_validator.png)

2.  [ESLint](https://eslint.org/).

3.  The lighthouse score couldnt be helped because the mp3 files are huge.
    ![Jigsaw validator message](src/assets/readme/lighthouse2.png)

### Unfixed Bugs

1. I had a nightmare writing the MP3 app part of this project. I went through maybe five different iterations of the code. I tried fixing the first three attempts, but bugs kept appearing out of nowhere. I couldn't give up on it though; I had no other ideas I felt passionate about, and I didn't want to turn in something lame that I couldn't show my friends. So, I deleted everything and tried again, but that attempt failed. Then I rewrote it once more, and somehow it came together, albeit with a few bugs. I encountered difficulties uploading the MP3s to Cloudinary, and once that was accomplished, it was challenging to obtain the appropriate Cloudinary link for the frontend.The original MP3 link came with an unexpected double 'https' prefix: ![Original mp3 link](src/assets/readme/OG_mp3_link.png)
   which I could not remove.So I had to manually extract the link, create an 'mp3_url' variable to strip away the double prefix, and then integrate it into my code: ![New mp3 link ](src/assets/readme/NEW_mp3_link.png)

2. I underestimated the fragility of this project. When I created a branch and began working there, a new path to Cloudinary was generated, causing my default images to stop working entirely. Initially, I decided to set this issue aside, assuming it wasn't a big deal.But this turned out to be a mistake. I later realized that this was actually a semi huge issue and had to invest considerable effort to resolve it. If felt like I had to part seas and move mountains just to get everything working again. ![Default image bug ](src/assets/readme/default_image_bug.png) So this works for now but it is not optimal.

## Technologies Used

### Main Languages Used

- HTML5
- CSS3
- Javascript
- Python
- SQL - Postgres

### Frameworks, Libraries & Programs Used

- Google Fonts : For all the fonts on the site.
- Font Awesome : For the icons.
- GitPod : To build the project & for the JSX & CSS files
- GitHub : To store the repository for submission.
- Am I Responsive? : To make sure the project legit on all devices.
- Favicon : For the logo image in the tab bar.
- Django : Used to build the backend database ( the API for the frontend)
- React-Bootstrap : For the layout of the website.
- ReactJS : To build the components for the frontend application.

## Components

### The components I used are :

1. Assets.js
2. Avatar.js
3. MoreDroptown.js
4. NavBar.js
5. NotFound.js

\*The only I reusded is the Asset.js

\*The rest are helper functions ,utlitly functions and hooks

6. axiosDefault.js
7. DropdownMenu.js
8. CurrentUserContext.js
9. ProfileDataContext.js
10. ToggleCollapse.js
11. useRedirect.js
12. utils.js

#

##### These steps I got from this README doc: [Deployment steps](https://github.com/CluelessBiker/project5-red-crayon)

## Deployment

The site is deployed to Heroku.
The deployment steps:

1. Launch the gitpod.
2. Install ReactJS:

```
npx create-react-app . --use-npm
npm start
```

2. Then nstall all the following packages using the command `npm install`:

```
react-bootstrap@1.6.3 bootstrap@4.6.0
react-router-dom@5.3.0
axios
react-infinite-scroll-component
msw --save-dev
jwt-decode
-g eslint
```

3. Git add, commit,push changes to gitpod.
4. Create the app on Heroku, and then link the GitHub repository. You need to navigate to the 'Deploy' tab.

### Connect to the API:

1. Go to the Heroku app of the DRF-API, and under the Settings tab, add the following configvars:

- Key: CLIENT_ORIGIN | Value: https://react-app-name.herokuapp.com
- Key: CLIENT_ORIGIN_DEV | Value: https://gitpod-browser-link.ws-eu54.gitpod.io

2. Make sure that the trailing slash `\` at the end of both links has been removed, and then save the configvar pairs.
3. Install the Axios package, & create supporting `axiosDefaults.js`.

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

## Credits

### Content

- [LAUREN MENTOR](https://github.com/CluelessBiker) I could not have wished for a better mentor.

- The README doc outline for the frontend I got from [HERE](https://github.com/CluelessBiker/project5-red-crayon).

- The README doc outline for the backend I got from [HERE](https://github.com/CluelessBiker/project5-drf-api).

- The outline for the ratings app I got from [HERE](https://github.com/andreas-ka/explore-sthlm-react-frontend) .

### Media

- All images came from [Google images](https://www.google.com/)
