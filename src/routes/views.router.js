import { compare } from 'bcrypt';
import Router from 'express';
import __dirname from "../utils.js";

const router = Router();

router.get("/", async(req, res) => {
    try {
        res.render('registerForm');
    } catch (error) {
        console.error("Error formulario Register", error)
    }
});

router.get("/login", async(req, res) => {
    try {
        res.render('loginForm');
    } catch (error) {
        console.error("Error formulario Login", error);
    }
});

router.get("/current", async(req, res) => {
    if(req.session.user) {
        res.send(req.session.user);
    }
    else {
        res.send('Por Favor loguearse primero');
    }
});

router.get("/logout", async(req, res) => {
    if(req.session.user) {
        let username = {username: req.session.user.username};
        req.session.destroy( err => {
            if(err) {
                res.send("Intente de nuevo");
            }
            else {
                try {
                     res.render("logout", username);
                }
                catch (error) {
                    res.send("Intente de nuevo");
                }
            }
        });
    }
    else{
        return res.redirect('/login');
    }
});

router.get('/loginfail', async(req, res) => {
    try {
        res.render('error', {messageError: "LOGIN"});
    } catch (error) {
        console.error("Error loginfail", error);
    }
});

router.get('/registerfail', async(req, res) => {
    try {
        res.render('error', {messageError: "SIGNUP"});
    } catch (error) {
        console.error("Error registerfail", error);
    }
});

export default router;