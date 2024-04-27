# TASK MANAGEMENT WEBSITE

A task management website built with MongoDB, Node.js, Express.js, Vite, React.js,   

## Usage

Follow these steps to set up and run the project on your local machine:

1. **Clone the Repository**: Open your terminal and run the following command to clone the repository to your local machine:
   ```bash
   git clone https://github.com/harshithakanala/task_management.git

2. Navigate to the Client Directory: Use the cd command to navigate into the client directory:
   ```bash
   cd task_management/client
   
3. Install Client Dependencies: Once you're inside the client directory, install the required dependencies using npm:
   ```bash
   npm install

4. Navigate to the Server Directory: Use the cd command to navigate into the server directory:
   ```bash
   cd ../server

5. Install Server Dependencies: Once you're inside the server directory, install the required dependencies using npm:
   ```bash
   npm install

6. Create a .env file in the root of the server directory and add the following environment variables:
   ```bash
   PORT=5000
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster_url/your_database_name?retryWrites=true&w=majority
   JWT_SECRET_KEY=your_jwt_secret_key
   JWT_EXPIRES=5d
   COOKIE_EXPIRE=5
   FRONTEND_URL=http://localhost:3000
   CLOUDINARY_CLIENT_NAME=your_cloudinary_client_name
   CLOUDINARY_CLIENT_API=your_cloudinary_client_api_key
   CLOUDINARY_CLIENT_SECRET=your_cloudinary_client_secret

   
7. Run the Project: After the dependencies are installed, you can run the project.
    - To start the client, run:
        ```bash
        npm run dev
     - To start the server, run:
        ```bash
        npm start
