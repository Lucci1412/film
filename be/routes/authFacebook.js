import passport from "passport";
import express from 'express';
import '../passport/passportFacebook.js'
const router = express.Router();

router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "Đăng nhập thất bại",
    });
  });
//logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.BASE_URL)
})

router.get("/", passport.authenticate("facebook", { scope: ["profile",'user_location' ] }));
router.get('/callback', passport.authenticate('facebook', {
    successRedirect:process.env.BASE_URL,
    failureRedirect: '/login/failed',
}))
export default router