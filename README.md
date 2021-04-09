# JavaScript SDK walk-through
This repository is my experience building a variety of applications using ForgeRock's JavaScript SDK for easier authentication and authorization.

[Live Demo](https://adam-cyclones.github.io/ForgeRock-JS-SDK-walkthrough/index.html)

## Agenda
_Commits should follow the steps outlined:_
### task 1: Plain JavaScript App
#### step 1: Create a personal project for learning. Create the project with the following requirements:
1. A personal Github repo
2. DNS alias within /etc/hosts
3. HTTPS with self-signed certs
4. Uses a cloud platform of some kind
5. Write Hello, World!
6. At each milestone, commit your progress and link the commit to the progress statement on the README
#### step 2: Create the most basic username-password SPA with the following requirements:
1. With no JavaScript framework, just create the most basic HTML, JS and CSS SPA with no dependencies other than the Core JS SDK (no FRUI) and Twitter Bootstrap (TBS) or an equivalent for default styling
2. Dependencies imported via old-school script and style tags; just use the single, built file from the SDK repo
3. The app renders a basic username-password form with default styling from TBS
4. Upon submission of the form, plain JS catches the form submission event and uses the value off of the event target to submit them with the SDK's FRAuth to AM.
5. Handles a success or failure of login, rendering some kind of basic message to user
6. Once logged in, display a functional logout button that uses the SessionManager to logout the user
7. Once logged out, display the same login form from above
#### step 3: Add an OAuth flow to the basic username-password from above:
1. After a successful login, use the SDK's getTokens to call an OAuth client to get access token and id token
2. After getting tokens, use the SDK's getUserInfo to call the userinfo endpoint
3. Render user info to screen
4. Using the logout button from the previous task, refactor to use FRUser to logout both session and OAuth tokens
---
### task 2: Vue App
#### step 4: Upgrade your existing project from old-school HTML and JS without any tooling or module system to a framework/tech that is MOST familiar to you:
1. Choose Angular, Vue, React ... whatever you're most effective in ... converting the project to a standard, convention-based (for the chosen framework) app
2. Leverage NPM for your dependencies and ES or Common JS module syntax
3. Make sure the all previous features work as expected after refactoring
4. Don't over-engineer it; keep it simple
#### step 5: Refactor your form and authentication flow to be callback driven
1. Change your authentication tree to include the following:
2. Page node with Username and Password Collector
3. Choice node with a "Are you human? Yes or no?" If yes, success; if no, fail
4. Configure the SDK at application initialization
5. Call AM for initial callbacks in tree before rendering login form
6. Render the login form components from the callback metadata
7. Labels from the `prompt` property
8. Inputs from callback type
9. Handle the additional step with the `ChoiceCallback` using recursion, looping, etc.: essentially, keep calling next and render form elements until you get a success or failure
#### step 6: Introduce a link or button that allows the user to do Centralized Login
1. Introduce a link or button that allows the user to do Centralized Login
2. Create a button on the page that says “Login via Platform” (essentially the user has a choice between using the embedded login, what you've already built, or with centralized login, what you will build)
3. Configure a new OAuth2 client in AM with “implied consent” disabled (aka enforcing consent)
4. The new button from above initiates the Centralized 5. Login flow that uses the new OAuth client you just created, leveraging the standard Authorization Code Flow of the OAuth 2 standard
5. Ensure consent is enforced
6. Handle the redirect back to your app and complete the OAuth flow using the provided authorization code and state provided in the redirect URL
Ensure both flows, embedded login and centralized login, are error/bug free


#### How to track progress
A commit log kept at the bottom of this page, should be updated using only the `update-readme-commits.sh` which will remove any risk of
stale data or human error. 

#### Commits style
- Commits should be prefixed with `task.N.step.N.N` 
```
task.2.step.1.1 commit relates to task 2 step 1 section 1 where I did X and Y for Z
```
- Commits should always be written after asking yourself the question; WHY not WHAT

## Design
My choices will be simple as possible, where I can I will remove complexity, I will not be including anything to install.

### DNS
Please add the following to your `/etc/hosts` file
```
# ForgeRock SDK Walkthrough 2021
adam-sdk.app
```

## Certs
I have used mkcert to generate certificates
```
mkcert adam-sdk.app 127.0.0.1
```

### Local deployment
TBA

then navigate to:

https://adam-sdk.app:8088/

### Styling
This demo does not aim to provide a styled solution which you would then need to unpick, instead I have included in the 
`index.html` file, a cdn import for new.css a classless css framework, simply remove these lines to remove default styling.
``` html
<link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css">
<style>
    header {
      display: flex;
      justify-content: space-between;
    }
    .hide {
      display: none;
    }
</style>
```

## Commit Log
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/e45e957 Initial commit
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/c326e76 step.1.2 DNS alias within  for https cert
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/570efa7 step.1.3 HTTPS with self-signed certs
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/45bce0 step.2.1 styling added via cdn and classless css theme
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/aa6e3d3 step.2.2 pulling in SDK file file from local prebuilt js
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/df35daf step.2.3 The app renders a basic username-password form with default styling
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/f0e2673 step.2.4 Upon submission of the form, plain JS catches the form submission event and uses the value off of the event target to submit them with the SDK's FRAuth to AM. - github demo untested
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/538c49a step.2.5 Handles a success or failure of login, rendering some kind of basic message to user
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/7f581ca step.2.6 & step.2.7 Once logged in, display a functional logout button that uses the SessionManager to logout the user - Once logged out, display the same login form from above
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/d3f7e47 step.3.1 After a successful login, use the SDK's getTokens to call an OAuth client to get access token and id token
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/a391143 update readme
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/ff613c5 step.3.2 After getting tokens, use the SDK's getUserInfo to call the userinfo endpoint
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/81a4842 step.3.3 Render user info to screen
- https://github.com/adam-cyclones/ForgeRock-JS-SDK-walkthrough/commit/dd3aa52 step.3.4 Using the logout button from the previous task, refactor to use FRUser to logout both session and OAuth tokens
