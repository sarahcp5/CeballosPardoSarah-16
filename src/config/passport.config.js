import passport from 'passport';
import local from 'passport-local';
import services from '../dao/config.js';
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:"email"},
    async(req, email, password, done) => {
        try {
            const {name} = req.body;
            if (!name || !email || !password) return done(null, false, {message: "Valores Incompletos"});
            const exists = await services.usersService.isExistUser(email);
            if(exists){
                return done(null, false, {message: "Usuario existente "});
            }
            const newUser = {
                name,
                email,
                password: createHash(password)
            }
            let user = await services.usersService.save(newUser);    
            return done(null, user);
        } catch(error) {
            console.log(error)
            done(error);
        }
    }));


    passport.use('login', new LocalStrategy({usernameField:'email'},
    async(email, password, done) => {
        try {
            if (!email || !password) return done(null, false, {message: "Valores Incompletos"});
            const exists = await services.usersService.isExistUser(email);
            if(!exists) {
                return done(null, false, {message: "Credenciales incorrectas, usuario no existente."});
            }
            let user = await services.usersService.getPassByEmail(email);
            if (!isValidPassword(user, password)) return done(null, false,{message: 'Contraseña incorrecta.'});
            return done(null, user)
        } catch (error){
            console.log(error)

            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        let result = await services.usersService.getById(id);
        return done(null, result);
    })
}

export default initializePassport;