# Firebase Authentication Project

This project is a simple web application built with vanilla HTML, CSS, and JavaScript. It uses Firebase Authentication for user login and registration.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Firebase Configuration](#firebase-configuration)
- [How to Use](#how-to-use)
- [Deployment](#deployment)

## Features

- User registration and login using Firebase Authentication.
- Firebase SDK integration for handling authentication.
- A modal popup for login and registration.
- Dynamic toggle between login and registration modes.

## Project Structure

```bash
.
├── index.html
├── index.css
├── index.js
└── README.md
└── config.public.js
``` 


## Getting Started
To set up this project on your local machine, follow the instructions below:

1. Clone the Repository

```bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Set Up Firebase
You need to set up Firebase in your project. Follow the steps below:

Go to the Firebase Console.
Create a new project.
Navigate to Project Settings > General and scroll down to Your Apps.
Register a new web app and Firebase will generate configuration details for you.
3. Firebase Configuration
After setting up Firebase, you'll get your Firebase configuration details. Add your Firebase credentials to your `config.public.js`

Replace the placeholder values with your actual Firebase configuration:

```javascript

const firebaseConfig = {
  apiKey: "YourApiKey",
  authDomain: "YourAuthDomain",
  projectId: "YourProjectId",
  storageBucket: "YourStorageBucket",
  messagingSenderId: "YourMessagingSenderId",
  appId: "YourAppId",
  measurementId: "YourMeasurementId",
};

```

4. Add Firebase SDKs


5. Run the Project
You can open the index.html file in any modern web browser to run the project locally. No additional server setup is required.

## How to Use

- Registration/Login Modal: When the page loads, the authentication modal will appear if the user is not logged in. The user can toggle between login and registration modes.
- Logout: Once logged in, the logout button will be available, allowing the user to log out from the application.


License
This project is licensed under the MIT License.


This `README.md` file provides a comprehensive overview of the project, including instructions on setting up Firebase, running the project, and deploying it. You can adjust the details (e.g., repository URLs) based on your project specifics.
