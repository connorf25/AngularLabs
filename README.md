# Basic Chat App
This is a basic chat app created for the Web Development Course

# Table of Contents
- [Git Repository](#git-repository)
- [Data Structures](#data-structures)
- [Angular Architecture](#angular-architecture)
- [Node Sever Architecture](#node-server-architecture)
- [Server/Client Responsibility](#server/client-responsibility)
- [Server Routes](#server-routes)


# Git Repository
The existing git repository from the lab sessions was made private and used to commit changes made in the assignment. All the commits for the assignment were made in a branch titled JSON-Login and then merged into the master branch at the end. For each commit a short description was provided.

# Data Structures
Two primary data JSON files were used in the assignment. One called users.json which contained an array of user objects and one named groups.json which contained an array of groups. 

## USER CLASS (SRC/APP/SERVICES/USER.CLASS.TS)
Username password and email are used to login information for a certain user.
The supp Boolean is used to record whether a given user has super user permissions while the ofGroupAdminsRole is used to store whether a user is a group admin (a super user is a group admin by default).
The optional valid argument is returned with login to determine whether the user entered correct login details. While birthdate and age are more optional variables the user can add if desired.

## GROUP CLASS (SRC/APP/SERVICES/GROUP.CLASS.TS)
Each group has the variables displayed above. There is a group name and a groupAdmin (the user who created that group. There is also a list of channel assistants who can add or remove channels and users from channels as well as a list of channels that have been created. Each channel in the array is its own object. Finally, there is a list of all users.

## CHANNEL CLASS (SRC/APP/SERVICES/GROUP.CLASS.TS)
Here the name of the channel is stored as well as a list of current users for that channel

# ANGULAR ARCHITECTURE
Initially with an empty path the user is taken to the chat page. If the user is not logged in, they are redirected to the login page. After logging in they are directed back to the base URL where the chat page is served. During this login process the information for that user is stored in local memory to avoid having to query the server for the user information as often. 
At the top of the chat page there is a navigation bar which contains a button which navigates to each of the components within the app. There is additionally a logout button which clears the user from local storage and redirects the user back to the login page.

# NODE SERVER ARCHITECTURE
The server architecture consists of a base file (server.js) which sets up the server and serves the distributed release of the web application. It is hosted on port 3000. In the server.js file there is a list of included API files as well as the path which points to those files. These API files are responsible for allowing communication between the client and server backend. The function each one of these API routes is given below in section 6.

# SERVER/CLIENT RESPONSIBILITY
The client is responsible for displaying any data retrieved from the server. The only data that is stored locally is the user information queried form the server. The responsibility of the server is to serve the html files to the client in addition to handling data requests from the client. There are multiple routes defined in the server which are responsible for retrieving and updating server side information.

# SEVER ROUTES: PURPOSE, PARAMETERS AND RETURN VALUES
## ADD USER
`/api/addUser`

This route takes in a new user, then retrieves the users.json from storage, adds the user and overwrites the file.

Parameters: User object

Return Value: Error/Success String

## ADD USER TO SERVER
`/api/addUserToServer`

This route takes in a username and adds a server to that users groupList[]. The group will now be displayed on the users group list. If the user already exists return an error.

Parameters: Username string

Return value: Error/Success String

## AUTH
`/api/auth`

This route receives the login username and password and compares it to the list of users. If the login was successful, the route will return the user object with a valid: true variable.

Parameters: Username and pw

Return Value: User Object

## GET GROUP
`/api/getGroup`

Receives a group name and returns the group object for that name

Parameters: Group name String

Return Value: Group Object

## GET USERS
`/api/getUsers`

Retrieve the array of all users objects from users.json, used so a super admin can control all users on the server.
Parameters: The user sending the request

Return Value: Array of all user objects

## REMOVE GROUP
`/api/removeGroup`

Find the group from group name in groups.json, remove from the array and overwrite the json file.
Parameters: Group name

Return Value: Success/error string

## REMOVE USER FROM SERVER
`/api/removeUserFromServer`

Find the user from a username and for the server name provided, remove any instances of that user

Parameters: Username, Server Name

Return Value: Success/Error string

## UPDATE GROUP
`/api/updateGroup`

Receive a group object, and either finds the matching group object by name or creates a new group object and pushes it to the array then overwrites the groups.json.

Parameters: Group Object

Return Value: Success/Error string

## UPDATE USER
`/api/updateUser`

Recieves a user object and either finds the matching user object by username or creates a new user if one does not already exist with the provided username. Writes any changes to users.json

Parameters: User Object

Return Value: Success/Error String

## UPDATE USERS
`/api/updateUsers`

Given a list of all users, overwrite the current users.json file

Parameters: Array of user objects

Return Value: Success/Error String

# CLIENT SERVER INTERACTION
All critical data is stored within the server/data directory in two json files, groups.json and users.json to store group and user data. The majority of this interaction is performed from within the chat page. On the far-left side there is a list of groups that the user is currently added to. If the user is a group admin or super user, they will have the ability to delete groups by clicking an x next to the group name. This will remove the list from the clients group list and also update the server to remove that group. Any users within that group will see the group disappear form the group list.
If the user clicks add group at the bottom of this list, a modal will popup asking the user to provide them with a group name. Upon clicking add, the group will be added to the server data and will now appear on the client’s screen.
All functionality explained for groups also applies to channels, however the user will be able to add/remove channels if they are group assistant of that group.
In the middle there is a large chat window which is not currently implemented.
On the right-hand side there is a list of users for that server if a group is selected. There are multiple sections, the group admin, the list of group assistants and a list of all server users. Additionally, if a channel is selected there will be an additional section with a list of users in the channel.
Like with groups and channels, users can be added to the server and removed if the user is a group admin.  Group admins can also add/remove group assistants. Group assistants have the ability to add/remove users from a channel. All of these changes are applied server side using the above routes in section 6. Once updated on the server, the client receives an updated view.
