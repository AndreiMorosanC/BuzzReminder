const express =  require("express")
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/auth");

router.post("/", verifyToken, async (req, res)=>{
    try{
        const {uid, email} = req.firebaseUser;

        let user = await User.findOne({uid})
        if(!user){
            user = new User({uid, email})
            await user.save();
        }
        res.status(201).json({
            mensaje: "Usuario guardado correctamente",
            user: {uid, email}
        });
    }catch(err){
        console.error(err);
        res.status(500).json({error: "error al guardar el usuario"})
    }
})


module.exports = router;