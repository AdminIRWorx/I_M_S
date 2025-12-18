import express from 'express'; // library for simplifying and streamlining the development of server-side applications and APIs
import mongoose from 'mongoose'; // library for connecting to MongoDB
import dotenv from 'dotenv'; // library that loads environment variables from a .env file
import Router from './routes/book-routes.js';
import i18next from 'i18next'; // framework used to easily add multiple language support (localisation)
import backend from 'i18next-fs-backend'; // allows Node.js to load translation files (JSON, YAML, JS) directly from the local filesystem
import middleware from 'i18next-http-middleware'; // provides functionality to manage and deliver localised content dynamically on the server side

if(process.env.NODE_ENV !== 'production'){
    dotenv.config(); //  load environment variables from a .env file, if enviroment is not in production
}

i18next
    .use(backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en', // one of the translation languages from the local filesystem
        backend: {
            loadPath: 'locales/{{lng}}.json' // whichever language from the local filesystem 
        }
    }); // enables the system to load the translation from the locales json files

const PORT = process.env.PortNumber || 3000; // call variable or default to 3000 if you're working in production mode
const app = express();


app.use(middleware.handle(i18next)); // enables the server to automatically detect the user's preferred language from the HTTP request
app.use(express.json()); // adding middleware that allows for json data to be passed through a post request
app.use('/books', Router); // set router folder

// app.get('/testing', async (req, res) => { // set route for testing translator. Route setting comes after middleware is set
//     res.send(req.t('testing')); // t is for translation
// });

const connectionString = process.env.Login; // call variable

const startMongoose = async() => {
    try {
        app.listen(PORT, () => {
        console.log(`App listening on Port ${PORT}`);
        });
        await mongoose.connect(connectionString); // pauses the execution of the async function until that promise settles (either fulfills or rejects)
        console.log('Connected to Mongo DB');
    } catch (error) {
        console.log(error.message);
    }
};
startMongoose();


// 2:02:30