import __dirname from '../utils.js'
import dotenv from 'dotenv';
import minimist from "minimist";

const {
    MODE,
    PORT,
    DEBUG,
    _
} = minimist(process.argv.slice(2),
    {
        alias: { m: "MODE", p: "PORT", d: "DEBUG" },
        default: { m:'DEV', p: 8080, d: false }
    }
)

dotenv.config({
    // path: MODE === "PROD" ? './.env.production' : './.env.development'
    path: MODE === "PROD" ? __dirname+'/../.env.production' : __dirname+'/../.env.development'

});

const information = {
    // [-] Argumentos de entrada  
    args: process.argv.slice(2),
    // [-] Path de ejecución
    execPath: process.cwd(),
    // [-] Nombre de la plataforma (sistema operativo)      
    plataforma: process.platform,
    // [-] Process id
    processID: process.pid,
    // [-] Versión de node.js      
    nodeVersion: process.version,
    // [-] Carpeta del proyecto
    carpeta: process.argv[1],
    // [-] Memoria total reservada (rss)
    memoria: ` ${Math.round( JSON.stringify(process.memoryUsage.rss())/ 1024 / 1024 * 100) / 100} MB`
}

export default {
    // init:{
    //     MODE: MODE,
    //     PORT: PORT,
    // },
    app:{
        MODE: process.env.MODE || 'DEV',
        PORT: process.env.PORT || 8080,
        DEBUG: process.env.DEBUG || false,
    MONGO_URL: process.env.MONGO_URL || 'NONE'
    },
    information
}