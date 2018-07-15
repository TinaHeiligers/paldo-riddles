# paldo-riddles
Quick starter for Hapi17 server with an SQLite3 db (currently stored to memory only).
Includes swagger (localhost:3000/documentation)

# Getting Started
1. Fork and clone the repo from  
`git@github.com:TinaHeiligers/paldo-riddles.git`

2. Ensure you have node and and npm installed (you may also use yarn)
 This project was built using node v8.9.4 and npm v6.1.0, but you may also use yarn v1.7.0.

3. Change directory into the paldo-riddles folder

`cd paldo-riddles`

4. Install the node modules:

`npm install` or `yarn install`

5. Copy .env-keep to a new file .env, or create a new file called .env and add the following to the .env file:
`NODE_ENV=development`

6. From the command line in the root of the project, run the app:

`npm start` or `yarn start`

7. In your browser (Chrome is preferable), visit  [random-quotation-static](http://localhost:3000/random-quotation-static). If all went well, you should see one of:

`{"quotation":"I want a turkey nut yogurt cane!","saidBy":"Stimpy"}`

`{"quotation":"I would rather fish any day than go to heaven.","saidBy":"Cornelia \"Fly Rod\" Crosby"}`

`{"quotation":"Streams make programming in node simple, elegant, and composable.","saidBy":"substack"}`

8. To test creation of items, you can use something like [Postman](https://www.getpostman.com/) to make a CREATE request to create a riddle that will be saved to memory.

Run postman and create a request with the folowwing configuration:

Method: 'CREATE',
url: `http://localhost:3000/riddle`,
Headers: key: Content-Type, value: application/json,
Body: type: raw, choice: application/json
The item body should look like:

`{
  "slug": "my-first-riddle",
  "question": "You work?",
  "answer": "Of course!"
}`

If all goes well, you should see the following in the response Body (viewing as 'Pretty'):
`{
    "slug": "my-first-riddle",
    "question": "You work?",
    "answer": "Of course!",
    "id": 2
}`

Making get request to [riddle-random](http://localhost:3000/riddle-random) or to [riddle/1](http://localhost:3000/riddle/1), should result in the following response:

`{
    "slug": "my-first-riddle",
    "question": "You work?",
    "answer": "Of course!",
    "id": 2
}`

9. Uploading image files:
The endpoint to test image file uploads is found at [upload-file](http://localhost:3000/upload-file), takes file(s) as the payload and returns a static message with a log of the file details on the console. Currently, any files uploaded are not saved anywhere.

The route takes the following configuration:

Headers: "key":"Content-Type","value":"multipart/form-data;

In the payload (body tab in Postman), select 'form-data' and a name for the first item you want to upload, select 'file' as the item type (see details below) and select the file you want to upload within the Value cell.

If all goes well, you should see 

`Received your data` 

in the response body, have a 200 status returned on the request and in your terminal window where the server is running, See a log of the file details uploaded:

`
{
    image: {
        filename: 'mainliningCoffee.jpeg',
        path: '/var/folders/1k/08z_48z13fqdsnld54sgpnx80000gp/T/1531677939795-56660-72237b35c9029df5',
        headers: {
            'content-disposition': 'form-data; name="image"; filename="mainliningCoffee.jpeg"',
            'content-type': 'image/jpeg'
        },
        bytes: 9563
    },
}
`

### Step-by-step postman instructions to upload a file:

__In the 'Headers' tab__
1. Start typing 'Cont' into the first key field, you should see a drop down of available options. Choose Content-Type.

2. In the value field for that key, stat typing 'multi', you should see a drop down selection that includes 'multipart/form-data'. Choose that.

__In the 'Body' tab__
1. Click on the row cell that has a placeholder of 'New key', 

2. On the right of that cell, there should be a dropdown where you can select either text or file

3. Select 'file'

4. Click on the 'Choose Files' button and select the file you wan to upload.

## More info:
There's a host of information and guides on getting started with [hapi-pal](https://hapipal.com/getting-started) along with quick start guides if you need more information on using/adding to this project or building your own. 

There is a SQLite database (currently saved in memory) in the project, powered by [knex](https://www.npmjs.com/package/knex) and there is an npm script that allows one to issue commands from the command line. For example, to create a new migration, one can run:

`npm run knex -- migrate:make my-first-migration`

To have the databse saved locally, change the filename from :momeory: to your desired location.
`connection: 
 {
  filename: ':memory:'
 }
`

# Contributors:
Tina Heiligers

#Licence:
MIT
