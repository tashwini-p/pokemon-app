# Pokemon App

## Introduction
Welcome to the ultimate Pokémon hub, your exclusive gateway to explore the vast world of Pokémon like never before! Dive into our comprehensive database containing information about every Pokémon that has ever graced the Pokémon universe. Whether you are a seasoned trainer or a curious newcomer, embark on your journey of discovery by simply searching for your favorite Pokémon. Get ready to uncover fascinating details, learn about their unique abilities, and immerse yourself in the enchanting lore of Pokémon. 

Every day, embark on a thrilling journey with an exclusive Pokémon handpicked just for you. Experience the excitement of discovering a new companion daily as we present you with a specially selected Pokémon to accompany you on your adventures. Unravel the mysteries, unleash the powers, and forge unforgettable bonds with these unique creatures. 

## Project Type
Fullstack

## Deplolyed App
Frontend:  https://pokemon-app-gamma-pink.vercel.app/ <br/>
Backend: https://pokemon-app-jf23.onrender.com/users


## Directory Structure
``` bash
pokemon-app/ 
├─ backend/
    ├─ src/
      ├─ config/
      ├─ middlewares/
      ├─ routers/
      ├─ schemas/
    ├─ index.html
    ├─ package.json
    ├─ package-lock.json
├─ fontend/
    ├─ public/
    ├─ src/
‎      ├─ assets/
‎      ├─ components/
         ├─ Navbar.jsx
         ├─ Pokemon.jsx 
      ├─ contexts/
      ├─ pages/
         ├─ Home.jsx
         ├─ Login.jsx
         ├─ Register.jsx
         ├─ Results.jsx
         ├─ PokemonInfo.jsx
      ├─ Routes
      ├─ routes/
      ├─ App.css
      ├─ App.jsx
      ├─ index.css
      ├─ main.jsx
    ├─ index.html
    ├─ package.json
    ├─ package-lock.json
```

## Features
- <strong>User Authentication</strong>: Users can register for an account and log in securely to access the features of the application.
- <strong>Pokemon Search</strong>: Users can search for any Pokemon they desire using the search functionality. The application will display search results in the form of cards, providing basic information about each Pokemon.
- <strong>Detailed Pokemon Information</strong>: Upon clicking on a Pokemon card, users can view more detailed information about the selected Pokemon, including its stats, abilities, type, and evolution chain.
- <strong>Daily Assigned Pokemon</strong>: Each day, the website assigns a unique Pokemon to each user, adding an element of surprise and fun to the user experience.


## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running: </br>
Step 1: Clone the repository on terminal </br>
Step 2: Move to the frontend folder </br>
Step 3: Install dependencies with the command ``` npm install``` </br>
Step 4: After the node modules have been installed, to start the app, run the command ``` npm run dev``` </br>

```bash
git clone https://github.com/tashwini-p/pokemon-app.git
cd pokemon-app
npm install 
npm run dev
```

## Images
Here are some images of the app!

![image](https://github.com/tashwini-p/pokemon-app/assets/154405564/1f42901a-d0da-45a8-9b77-ca816e3a0005)

</br></br>
_______________________________________________________________________________________________________________________________

![image](https://github.com/tashwini-p/pokemon-app/assets/154405564/52d85f22-306a-477e-aeb5-cbac3eb4f95a)

</br></br>
_______________________________________________________________________________________________________________________________

![image](https://github.com/tashwini-p/pokemon-app/assets/154405564/c8e5dc0c-80a7-444e-8bec-1f8fb4757ac4)

</br></br>

## APIs Used
An external API was used in this project to fetch information about the all the existing Pokemons : <br/>
https://pokeapi.co/

## API Endpoints
Here are a list of endpoints for making requests to the backend server </br>
GET /users - retrieve all user information </br>
POST /users/register - to register a new user </br>
POST /users/login - to login a user to the app </br>
POST /users/logout - to logout </br>

## Technology Stack
- React.js
- Node.js
- Express.js
- MongoDB
