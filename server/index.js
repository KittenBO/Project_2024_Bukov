import express from 'express';
import 'dotenv/config';
import Sequelize  from './db.js'
import { User, Basket, BasketDevice, Device, Type, Brand, Rating, DeviceInfo, TypeBrand } from './models/models.js';
import { router }  from './routes/index.js';
import errorHandlingMidlleware from './middleware/errorHandlingMidlleware.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);


app.use(errorHandlingMidlleware)

const start = async () => {
    try {
        await Sequelize.authenticate()
        await Sequelize.sync()
        app.listen(process.env.PORT || 7000, () => console.log(`Сервер запущен ${process.env.PORT || 7000}`))
    } catch(e) {
        console.log(`Ошибка при подключении ${e}`)
    }
}


start()