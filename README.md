# Joinclusion Frontend

Welcome to the Joinclusion Frontend repository! This repository contains the code for the frontend of the Joinclusion project.

## Requirements

Before you begin, ensure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) and npm (Node Package Manager)
- [Git](https://git-scm.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

1. Clone this repository to your local machine:
   ```sh
   git clone https://github.com/JohnChristidis/joinclusion-frontend.git
   cd joinclusion-frontend
   npm install
   // change the src/utils/config.js to the backendUrl of your choice

   --------> UPDATE <----------
   In the root folder create a .env file
   Inside add the following:
   ENVIRONMENT=staging
   LOCATION_KEY_FILE= your_key
   LOCATION_CERTIFICATE_FILE= your_certificate
   ---------> END OF UPDATE <----------

   Then in the terminal
   npm run dev
   npm run build
