import Router from 'express';
import __dirname from "../utils.js";
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register',{failureRedirect: '/api/sessions/registerfail'}), async(req, res) => {
    return res.send({status: "success", payload: req.user._id});
});

router.get('/registerfail', async(req, res) => {
    return res.send({status:"error", error:"Error registerfail"});
});

router.post("/login", passport.authenticate('login',{failureRedirect: '/api/sessions/loginfail'}), async(req, res) => {
     
    req.session.user = {
        username: req.user.name,
        email: req.user.email,
        id: req.user._id,
        role: "user"
    }

    return res.send({status: 'success', payload: req.session.user});
});

router.get('/loginfail', async(req, res) => {
    return res.send({status:"error", error:"Error loginfail"});
});

export default router;