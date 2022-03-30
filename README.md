Zshop is a shopping mall system written by NodeJS. Users can choose and submit virtual goods they want to buy through the shopping mall page


Deployment mode:
Install Express framework:
1.Create a new folder on the desktop and use vscode to open the access terminal
2. Global Install Express
    npm install express  -g
3. The global installation of Express-Generator does not report an error in this step ('express' is not an internal or external command, nor is it a runnable program
Or batch files.)

    npm install -g express-generator
Install `node.js`(7.6 version above, because 'async/ Await' is supported）
1.Download the Node. Js site: https://nodejs.org/en/download/
2. Select the installation directory to install (you can customize the installation location here)
3. Download the software. If you download the.mSI file and need to install it, just keep installing next. If you need to change the installation location, you can change it yourself.
If you are downloading a ZIP archive, simply unzip it and place it in the folder you want to place it in.
4. Once the installation is complete, you can do a simple test to see if the installation was successful. Press [Win +R] on the keyboard, enter CMD, and then press Enter to open the CMD window. Two commands: node_v& nPM_v

Install 'mysql' database (UTF-8 encoded configuration), connect to database 'zshop';
Download the Zshop file and change the connection configuration (' config-default.js' and 'config-test.js' under the directory) from the database. Execute' NPM install 'in the root directory to download the dependency library and then execute' zshop.sql'
Finally, execute 'node app.js' in the project root directory. See log' app started at port 3000... 'on behalf of the successful start（url:localhost:3000/zshop）

