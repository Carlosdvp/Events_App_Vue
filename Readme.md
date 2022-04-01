# events_app_vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


----------------------------------------------------------------------


# Part 1 

- set up the base for the app
	-- initialize the project and the basic foldrs and components

- customize the vue app and the components as needed


# Part 2

1. create a mock DB for the events


- to access the fake server (https://my-json-server.typicode.com/) with the dummy data we are providing (data/db.json) use the following URL:

	-- my-json-server.typicode.com/{GithubUserName}/{RepoName}/events

	my-json-server.typicode.com/Carlosdvp/events_app_vue/events



2. install Axios to make API calls

- To write our API call, we’ll head into the EventList.vue component, delete out the hard-coded events data, import Axios, then add the created lifecycle hook.



3. implement a getEvents() api call

- In our case, we want to make our API call and get our events when the component is created, so we’ll run the get method available to us on axios, passing in the my-json-server url as the argument (where we want to get from).



4. Refactor api code into service layer

------------------------------------------------------------------------


# Part 3  -- Deploying with Render

## Deployment Steps

- Find a Web Hosting Service
- Get SSL for a secure domain
- Build the site locally
- Drop those files into the server
- Ensure it is served correctly


* Website

https://render.com/

* Dashboard

https://dashboard.render.com/

* URl for the live site

https://events-vue3-app.onrender.com

- this seems like another good option, along with Heroku for a free option, although for more professional projects I can still use AWS, where my main site is hosted.


------------------------------------------------------------------------


# Part 4  -- Touring Vue Router

## Pagination

### Building Pagination

- Modify the eventService API call to take perPage and page
- Parse and set the surrent page from the router using Function Mode
- Modify EventList.vue to pass on a page number to EventService API
- Add Pagination linls to the EventList Template
- Only shoe the Next page link when tehere is a Next page

I will add a new branch to add this feature without making breaking changes to the app before the thing is completed and working as intended. Otherwise the deployed app will get re-rendered with faulty code.

_New Branch: building-pagination_


### Important Points

#### EventList.vue

when using the API call in the `created()` lifecycle hook, it only gets called when the page is created, so when we try to access the function again afterward for the pagination, nothing happens.

In order tog et around this, we use the `import { watchEffect } from 'vue'` method, and then wrap the function call inside the created lifecycle hook inside of it, making the api call reactive. So, now anytime the function gets called it will update the page.

When reactive objects are accessd inside this function change, it will run this function again.

-----------------------

## Nested Routes

### How do We map actions o URLs with a single resource?

Resource = event

Actions = [Event details, Register for the Event, Edit the Event]

- This section uses 2 approaches
	- one with normal Routing
	- and another with Nested Routes

- With normal routing we achieve the desired goal, but we have a lot of duplicate code in the components.

- The use of Nested Routes will allow us to reduce duplicate code and make the application more streamlined.

#### How do we use Nested Routes?

- create a layout component for our event components
- this will contain the navigation for each event page, and the API call for fetching the event


******
### Error: 
While there were originally 3 items in Events, the app was only showing 2, and although pagination works, the same two events kept being shown.

- Also, when I reduced the number of events per page to one, the same event would be shown on all pages, although the pagination would appear as if there 2 pages, both sowing the same event.

### Solution:
Apparently in the EventService file where the getEvents method should've had

`&_page` I had `$_page`

*****

-----------------------

## Redirects and Aliases

Lets say that at some point you want to change a URL in your app from one route to another.

- For example, changing `/about` to `/about-us`

You would have to:
	* Redirect the old route to the new route
	- or -
	* Alias the old route to the new route

- In our application we will do the following:
	- change `/event/:id` to `/events/:id`
- This will be accomplished by:
	1. Updating our component router path
	2. Redirecting the old route to the new route


-----------------------

## Programmatic Navigation

We will a button to the Event Registration page, and make it so that when we click on it, we progrmatically navigate back to the Event page.

One thing we should keep in mind is that when we call `<router-link>` it's calling `this.$router.push` from inside the router-link definition.

For example: 

- when we have something like this:
	`<router-link :to="{ name: 'About' }">About</router-link>`
- once this link is clicked, it calls:
	`this.$router.push({ name: 'About' })`


-----------------------

## Error Handling

### Common Errors we need to account for

* When a user tries to navigate to a page that doesn't exist
* When a user navigates to a resource that doesn't exist
* When the user's network connectivity fails

- when a path doesn't exist we ned to load a Not Found component
- when an event doesn't exist we will also load the NotFound component
- when the network fails, let's load a NetworkError component


-----------------------

## Flash Messages

Problem: No message to confirm registration for an Event

We need to accomplish the following:

	- Create a global storage mechanism to store a flash message
	- Set the flash message inside Register.vue
	- Create a place where flash message is displayed

#### Global Storage mechanism

Although this is what Vuex is for, in vue 3 we have another solution and we don't need Vuex for that.

We can create a reactive object to use as Global Storage, and share that object across our app.

`Reactive means that when the object is updated, any Component that uses the object is re-rendered`


#### Lesson Components

In this lesson we updated the code in the following places:
	- main.js
	- Register.vue
	- App.vue



-----------------------

## In-component Route Guards

Problem: When internet is slow our page hangs

We can solve this by using a progress bar with either of these options:
	1. In-component Route Guards
	2. Global and Per-route guards

We will be using the first approach in the app.

1. In-component Route Guards
	- Move API call into an In-component route guard
	- Install nprogress, progress bar library
	- Start progress bar when routing to the component
	- Finish the progress bar when the API call finishes
	- Once this is done, ensure that the pagination still works as it should

Vue Router has In-component Route Hooks, these are additional lifecycle hooks.
	- beforeRouteEnter
		- called before the component is created
	- beforeRuteUpdate
		- called when the route changes, but the component has not
	- beforeRouteLeave
		- called when the route is navigated away from


--------------------------------------------------------------------
(I will create a new branch to work on this new feature)

- git checkout main
- git merge feature-pagination

- git checkout feature-route-guards
--------------------------------------------------------------------

