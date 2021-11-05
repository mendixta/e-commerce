# E-Commerce Back End

# Summary: 
For this weeks assignment, we were asked to create/build the backend for an e-commerce site by modifying starter code by configuring a working Express.js API to use sequelize to interact with a MySQL database. 


# Getting Started:
When working with the starter code, I decided to reference previous activities along with the mini project from the MVC lesson in order to get an idea where to get started with the assignment, after that, it was smooth sailing from there. 

Along the way, I had some trouble running the app on the terminal, I would continue go get an error regarding the node_modules which I had to delete and re-download in order to get everything up and going again.



# Running the App:
In order to run the E-Commerce App, you must follow the following steps:

- Git Clone the project using SSH or HTTPS, after cloning the project, you should see a "package.json" file within the folder, meaning that  you must npm install your node_modules.

- Use the command "npm i" in the command line to download your node_modules!

- After your node_modules are installed, use the following commands to get the app to run:
    - Log into MySQL in the command line using the command "mysql -u root -p", and enter your password if needed.
    - Then, enter "source db/schema.sql"/navigate to where your schema.sql file is, the following should come up after successfully sourcing your file. 
    - Then, quit MySQL, by typing "quit" or "exit" in the command line:
![screenshot-terminal-1](https://user-images.githubusercontent.com/87496972/140557492-621b4757-d1c1-4ec3-9ce6-9008e8ec9d8b.png)
    - Then npm run seeds by typing "npm run seeds" in the command line, which will give you the following prompt:
![screenshot-terminal-2](https://user-images.githubusercontent.com/87496972/140557531-17f82481-17b3-49fc-a00d-e1680cd77592.png)

   - Finally, run node server.js file by typing "node server.js" into the command line, you should get a message saying that the app is listening on a local port!

A video of a detailed walk through is provided below!


# Walk-Through Video:
https://vimeo.com/642885347
