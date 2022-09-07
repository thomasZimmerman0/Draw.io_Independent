const express = require('express');
const router = express.Router();
const auth = require('../auth')
let db = require('../models')

// const path = require('path')
// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'profile_images')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })


// const upload = multer({storage: storage})

// router.get('/profile',auth, (req,res) => {

   
//     res.render('profile', {

//         username: req.user.userName,
//         email: req.user.email
        
//     })

// })

router.get('/profile/:id', async(req, res) => {

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)

    // console.log(user.userName);

    let followerString = user.followers
    let followerArray = []

    if(followerString != null){
        followerArray = followerString.split(', ')
    }

    let followingString = user.following
    let followingArray = []

    if(followingString != null){
        followingArray = followingString.split(', ')
    }

    console.log(followerArray);
    console.log(followingArray)

    res.render('profile', {
        user : user,
        followers : followerArray,
        following : followingArray
    })
    
    
})

// router.post("/profile", upload.single("image"), (req, res) =>{
//     res.render('profile')
// })

router.get("/follow/:id", auth, async (req, res)=>{

    let selectedID = req.params.id
    const user = await db.users.findByPk(selectedID)
    let followerString = user.followers

    followerString += req.user.id + ', '

    let updateFollow = await db.users.update({ followers: followerString}, {
        where: {
            userName: user.userName
        }
    })

    let followingString = req.user.following

    followingString += user.id + ', '

    let updateFollowers = await db.users.update({ following: followingString}, {
        where: {
            userName : req.user.userName
        }
    })

    res.redirect(`/profile/${selectedID}`)
})

router.get('/delete/:id', async (req, res)=>{

    let selectedID = req.params.id


    let deleteAccount = await db.users.destroy({
        where: {
            id : selectedID
        }
    })

    res.redirect('/')
})


module.exports = router;
