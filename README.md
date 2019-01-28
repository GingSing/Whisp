# Whisp

Personal project for downloading and listening to music from youtube.

The point of this project is so that users can listen to songs from youtube that might be appear on spotify or other popular music streaming apps.
Although many music apps boast a large amount of media access, there are still times at which a user may want to listen to songs that their favorite youtube creator has made or a song that isn't popular enough to put itself onto their radars. Users will be able to download these songs and have it saved on a remote server or their own personal computers.

This project uses: ReactJS + Redux + Ant Design in the front end and NodeJS + MongoDB + Express for the backend. The entire project was created by me save a regex function in one of the redux actions.

# Current Features

1. Can download songs from youtube and listen to other songs while doing so
2. Can save songs to playlists and favourites
3. Can name songs
4. Saves song locations to a database along with metadata for user access
5. Can control the music being played through play, pause, forward, previous, loop and volume buttons as well as manipulate the current playtime of the player
6. Can play music from any tab
7. Provides friendly interface for users


# Features to Be Added

1. Allow users to download these songs individually or as a playlist onto their computer if they are running it on a remote server
2. Create users so that many people can share one collection of songs
3. The ability to message other while using the app and share songs of their liking
4. Download playlists from youtube at once



# To use this program

1. Clone the Project.
2. Run "npm install" to install dependencies.
3. Create a config file that exports MONGO_URI and MONGO_USER_ID (new user has to be created first with the user route).
4. Create a static folder in the working directory and then create a music folder in the static folder.
5. Run "npm run dev" to run both server and client".