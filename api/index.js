const express = require('express');
const app = express();
const WebSocket = require('ws');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const imageDownloader = require('image-downloader');
const { userVerification } = require('./auth');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');
const Place = require('./models/places');
const Review = require('./models/review');
const Booking = require('./models/bookings');
const Reply = require('./models/reply');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const Places = require('./models/places');
const { match } = require('assert');
const upload = multer({ dest: 'uploads/' });
const Pan = require('./models/pan');
const { Vonage } = require('@vonage/server-sdk');
const Like = require('./models/like');
const { start } = require('repl');

const vonage = new Vonage({
    apiKey: "3e8c97d3",
    apiSecret: "CVfunfEbI2SaLEjB"
})





const server = new WebSocket.Server({
    port: 8080
},
    () => {
        console.log('Chat Server started on 8080');
    })
// implementing web socket connection.
mongoose.connect('mongodb://127.0.0.1:27017/fullstack')
    .then(() => {
        console.log("Mongo Database connected successfully");
    })
    .catch((err) => {
        console.log("Oh no Mongo Error");
    })

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));


const users = new Set();

function sendMessage(message) {
    users.forEach((user) => {
        user.ws.send(JSON.stringify(message));
    });
}



server.on('connection', (ws) => {
    const userRef = {
        ws,
    };
    users.add(userRef);
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (
                typeof data.sender !== 'string' ||
                typeof data.body !== 'string' ||
                typeof data.reciever !== 'string'
            ) {
                console.log('Invalid Message');
                return;
            }

            const messageToSend = {
                sender: data.sender,
                body: data.body,
                reciever: data.reciever,
                sentAt: Date.now()
            }

            console.log('Valid and Nice Message')
            sendMessage(messageToSend);

        }
        catch (e) {
            console.log('Error Passing Messages');
        }
    });
    ws.on('close', (code, reason) => {
        users.delete(userRef);
        console.log(`Connection Closed: ${code} ${reason}!`);
    })
});




function passwordCreation(pass) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
}

const jwtSecret = 'fdjsdi6hjhAF56dsty';

app.get('/', (req, res) => {
    res.json("This is index");
})


app.get('/test', (req, res) => {
    res.json("This is fonzzi world");
})
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const RegUser = await User.findOne({ username });
        if (RegUser === null) {
            res.status(422).json("Invalid Credentials");
        }
        else {
            const match = bcrypt.compareSync(password, RegUser.password);
            if (match) {
                jwt.sign({ email: RegUser.email, username: RegUser.username, id: RegUser._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(RegUser);
                })
                return true;
            }
            else {
                res.status(422).json("Invalid Credentials");
            }
        }
    } catch (e) {
        console.log("Error in Login", e);
    }

})




app.get('/comments/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Review.findById(id));
})


app.get('/comments/count/:id', async (req, res) => {
    const { id } = req.params;
    res.json(id);
})

app.get('/user/details/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await User.findById(id).populate('favourites'));
})


app.post('/pan/new/:id', async (req, res) => {
    const { pan } = req.body;
    const { id } = req.params;
    const myUser = await User.findById(id);
    const myPan = new Pan({ Uid: pan });
    myPan.author = id;
    await myPan.save();
    myUser.pan = myPan._id;
    await myUser.save();
    res.json(await User.findById(id).populate('pan'));
});



app.post('/phone/verify/:id', (req, res) => {
    const { id } = req.params;
    const { thePhone } = req.body;
    vonage.verify.check(thePhone, id)
        .then(resp => {
            console.log(resp)
            if (resp.errorText) {
                res.json(false);
            }
            else {
                res.json(true);
            }
        })
        .catch(err => {
            console.error(err)
            res.json(false);
        });
})

app.post('/phone/:id/new', async (req, res) => {
    const { phone } = req.body;
    vonage.verify.start({
        number: "91" + phone,
        brand: "Vonage"
    })
        .then(resp => {
            console.log(resp.request_id)
            res.json(resp.requestId);
        })
        .catch(err => console.error(err));
    // const {id} = req.params;


    // const theUser = await User.findById(id);
    // theUser.phone = phone;
    // await theUser.save();
    // res.json(theUser);
})



app.get('/pan/details/:id', async (req, res) => {
    const { id } = req.params;
    const myResult = await User.findById(id).populate('pan');
    if (myResult) {
        res.json(myResult)
    }
    else {
        res.json('');
    };
})

app.get('/fetch/myPosts/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Place.find({});
    const myPosts = result.filter((name) => name.owner.toString() === id);
    res.json(myPosts);
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const userDoc = await User.findById(user.id);
            res.json(userDoc);
        })
    }
    else {
        res.json(null);
    }
});


app.post('/addPlace', async (req, res) => {
    const { title, address, addedPhotos, location, description, price, perks, extraInfo, checkin, checkout, maxguests } = req.body;
    const newPlace = new Place({ title: title, location: location, price: price, extraInfo: extraInfo, description: description, address: address, photos: addedPhotos, perks: perks, checkIn: checkin, checkOut: checkout, maxGuests: maxguests });
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        newPlace.owner = user.id;
    });
    await newPlace.save();
    res.json(newPlace);
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName);
})

app.get('/showPlaces', async (req, res) => {
    const allPlaces = await Place.find({}).populate('owner');
    res.json(allPlaces);
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Place.findById(id).populate({
        path: 'review',
        populate: {
            path: 'author'
        }
    }).populate('owner');
    res.json(result);
})



app.get('/commentDetails/:id', async (req, res) => {
    const { id } = req.params;
    const CommentDetails = await Review.findById(id).populate({
        path: 'replies',
        populate: {
            path: 'author'
        }
    });
    res.json(CommentDetails);
})


app.get('/likesofComment/comment/:id/myran', (req, res) => {
    res.json('poda');
})


app.post('/liking/:id', async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    const theComment = await Review.findById(id);
    if (theComment.likes.includes(user._id)) {
        await Review.findByIdAndUpdate(id, { $pull: { likes: user._id } });
        await theComment.save();
        res.json(await Review.findById(id));
    }
    else {
        theComment.likes.push(user._id);
        await theComment.save();
        res.json(theComment);
    }
});

app.get('/sortedResult/:searchQuery/:locID', async (req, res) => {
    const { searchQuery } = req.params;
    const { locID } = req.params;
    const finalSearch = '^' + searchQuery + '.' + '*';
    const query = { place: locID, body: { $regex: finalSearch, $options: 'i' } };
    const lastResults = await Review.find(query).populate('author');
    res.json(lastResults);
})

app.post('/placeLike/:id', async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    const theUser = await User.findById(user._id);
    if (theUser.favourites.includes(id)) {
        await User.findByIdAndUpdate(user._id, { $pull: { favourites: id } });
        res.json(await User.findById(user._id));
    }
    else {
        theUser.favourites.push(id);
        await theUser.save();
        res.json(theUser);
    }
})

app.post('/commentReply/:id', async (req, res) => {
    const { id } = req.params;
    const { reply, user } = req.body;
    const replyMessage = new Reply({ body: reply });
    replyMessage.author = user._id;
    await replyMessage.save();
    const ogComment = await Review.findById(id);
    ogComment.replies.push(replyMessage);
    await ogComment.save();
    res.json(await Review.findById(id).populate({
        path: 'replies',
        populate: {
            path: 'author'
        }
    }));
});


app.delete('/deletePost/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Place.findById(id);
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        if (result.owner._id.toString() === user.id) {
            await Place.findByIdAndDelete(id);
            res.json(true);
        }
        else {
            res.json(false);
        }
    });
});

app.get('/account/edit/details/:id', async (req, res) => {
    const { id } = req.params;
    const myPlace = await Place.findById(id);
    res.json(myPlace);
})


app.post('/isavailable', async (req, res) => {
    const { startDate, endDate, homeGuests } = req.body;
    let newGuests = parseInt(homeGuests);
    let availablePlaces = []
    const checkinDate = new Date(startDate);
    const checkoutDate = new Date(endDate);
    const isBooked = await Booking.find({
        $or:[
        { checkin: { $lt: checkoutDate, $gte: checkinDate } },
        { checkout: { $gt: checkinDate, $lte: checkoutDate } },
        { checkin: { $lte: checkinDate }, checkout: { $gte: checkoutDate } }
        ]
    });
    const bookedPlacesIds = isBooked.map(booking => booking.place);
    if(newGuests > 0){
        availablePlaces = await Places.find({_id: {$nin: bookedPlacesIds}, maxGuests: {$lte: newGuests}});
    }
    else{
        availablePlaces = await Places.find({_id: {$nin: bookedPlacesIds}});
    }
    
    res.json(availablePlaces);
});

app.get('/getcommentCount/:id', (req, res) => {
    res.json('ethi molu ivade');
})

app.get('/fetchName/:id', (req, res) => {
    const { id } = req.params;
    const owner = User.findById(id);
    res.json(owner);
})


app.post('/editPlace/:id', async (req, res) => {
    const { id } = req.params;
    const { title, address, locations, price, description, perks, extraInfo, checkin, checkout, maxguests } = req.body;
    const finalPlace = await Place.findByIdAndUpdate(id, { location: locations, title: title, price: price, address: address, extraInfo: extraInfo, description: description, checkIn: checkin, checkOut: checkout, maxGuests: maxguests, perks: perks });
    res.json(finalPlace);
})


app.post('/addFavourites/:id', (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const fonzzi = await User.findById(user.id);
        fonzzi.favourites.push(id);
        await fonzzi.save();
        res.json(fonzzi);
    });
});

app.get('/placeDetails/:word', async (req, res) => {
    const { word } = req.params;
    // const finalSearch = '^' + word + '.' + '*';
    const query = { location: { $regex: word, $options: 'i' } };
    const finalResults = await Place.find(query).populate('owner');
    res.json(finalResults);
});


app.post('/results/getSorted', async (req, res) => {
    const { mininitalValue, maxInitialValue, value, perks } = req.body;
    const query = { price: { $lte: maxInitialValue, $gte: mininitalValue }, maxGuests: { $lte: value } };
    const finalResults = await Place.find(query).populate('owner');
    res.json(finalResults);
});

app.post('/searchafterFiltering/results', async (req, res) => {
    const { filteredPlaces, searchDest } = req.body;
    const filterIds = filteredPlaces.map((item) => item._id);
    const query = { location: { $regex: searchDest, $options: 'i' } };
    const finalResults = await Place.find(query).populate('owner');
    const matchingResults = finalResults.filter(item => filterIds.some(id => id === item._id));
    res.json(matchingResults);
});

app.get('isfavourites/:id', (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const fonzzi = await User.find({ favourites: id });
        if (fonzzi) {
            res.json('found');
        } else {
            res.json('not found');
        }
    });
});

app.post('/addcomment/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const { comment, rating } = req.body;
    const result = await Place.findById(id);
    const myComment = new Review({ body: comment });
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        myComment.author = user.id;
    });
    myComment.rating = rating;
    myComment.place = id;
    result.review.push(myComment);
    await myComment.save();
    await result.save();
    res.json(await Place.findById(id).populate({
        path: 'review',
        populate: {
            path: 'author'
        }
    }).populate('owner'));
});

app.get('/checkaccomodations', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const { id } = user;
        const result = await Places.find({ owner: user.id });
        if (result.length > 0) {
            res.json(result);
        }
    });
})




app.get('/fetch/commentLikes/:id/fonzzi', async (req, res) => {
    // const {id} = req.params;
    // const resultplace = await Place.findById(id);
    // res.json(resultplace);
    res.json('its fonzzi');
})


app.get('/likes/comment/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Review.findById(id);
    console.log(result);
})

app.get('/myPlaces', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const { id } = user;
        res.json(await Place.find({ owner: id }));
    });
})

app.post('/booking', async (req, res) => {
    const { token } = req.cookies;
    const response = new Booking(req.body);
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        response.booker = user.id;
    });
    await response.save();
    res.json(response);
})

app.get('/bookings/details', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        res.json(await Booking.find({ booker: user.id }).populate('place'));
    });

})

app.get('/userProfile/:id', async (req, res) => {
    const { id } = req.params;
    const result = await User.findById(id);
    res.json(result);
})

app.post('/password/change/:id', async (req, res) => {
    const { id } = req.params;
    const { currPass, newPass } = req.body;
    const foundedUser = await User.findById(id);
    const match = bcrypt.compareSync(currPass, foundedUser.password);
    if (match) {
        const hashedPassword = passwordCreation(newPass);
        const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword, updatedAt: Date.now() })
        await updatedUser.save();
        res.json(updatedUser);
    }
    else {
        res.json(false);
    }
})


app.post('/password/validation', (req, res) => {
    const { password, user } = req.body;
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
        res.status(200).json(true);
    }
    else {
        res.json(false);
    }
});

app.post('/new/preferred/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const theUser = await User.findById(id);
    theUser.preferredname = name;
    await theUser.save();
    res.json(theUser);
})

app.post('/profile/picture', (req, res) => {
    const { profilepic } = req.body;
    res.json(profilepic);
});

app.post('/account/remove', async (req, res) => {
    try {
        const { user } = req.body;
        const id = user._id;
        await Place.deleteMany({ owner: id });
        const replies = await Reply.find({ author: id });
        const replyIds = replies.map(reply => reply._id);
        await Review.updateMany({ replies: { $in: replyIds } }, { $pull: { replies: { $in: replyIds } } });
        await Reply.deleteMany({ _id: { $in: replyIds } });
        await Review.deleteMany({ author: id });
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successfully deleted all reviews and replies' });
    }
    catch (e) {
        res.status(500).json({ error: 'An error occured while Deactivating this account' });
    }
});


app.post('/password/reset/validate/:id', async (req, res) => {
    const { id } = req.params;
    const { newPass } = req.body;
    const theUser = await User.findById(id);
    const hashedPass = passwordCreation(newPass);
    const match = bcrypt.compareSync(newPass, theUser.password);
    if (match) {
        res.json(null);
    }
    else {
        const result = await User.findByIdAndUpdate(id, { password: hashedPass });
        await theUser.save();
        res.json(result);
    }

})

app.post('/password/reset', async (req, res) => {
    const { username, secret } = req.body;
    const result = await User.findOne({ username: username });
    if (result && result.secret) {
        if (result.secret === secret) {
            res.json(result);
        }
        else {
            res.json(null);
        }
    }
    else {
        res.json(null);
    };
});

app.post('/register', async (req, res) => {
    try {
        const { email, password, username, secret } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const hashedPass = passwordCreation(password);
        const myUser = new User({ username: username, email: email, password: hashedPass, secret: secret });
        await myUser.save();
        jwt.sign({ email: myUser.email, username: myUser.username, id: myUser._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { domain: 'localhost', path: '/' }).json(myUser);
        })

    } catch (error) {
        console.error(error);
    }
});


// const BookingSchema = new mongoose.Schema({
//     place: {type: mongoose.Schema.Types.ObjectId, ref: 'Places'},
//     booker: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//     checkin: {type: Date, required: true},
//     guests: {type: Number, required: true},
//     checkout: {type: Date, required: true},
//     name: {type: String, required: true},
//     price: {type: Number, required: true}
// });


app.post('/isBooked/:id', async (req, res) => {
    const { id } = req.params;
    const { checkin, checkout } = req.body;
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const isBooked = await Booking.find({
        place: id, $or: [
            { checkin: { $lt: checkoutDate, $gte: checkinDate } },
            { checkout: { $gt: checkinDate, $lte: checkoutDate } },
            { checkin: { $lte: checkinDate }, checkout: { $gte: checkoutDate } },
        ]
    });


    if (isBooked.length === 0) {
        res.json(false);
    }
    else {
        res.json(true);
    }
})


// const placeSchema = new mongoose.Schema({
//     owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//     location: String,
//     title: String,
//     price: Number,
//     address: String,
//     photos: [String],
//     perks: [String],
//     extraInfo: String,
//     rating: Number,
//     description: String,
//     checkIn: Number,
//     checkOut: Number,
//     maxGuests: Number,
//     review: [
//         {
//         type: mongoose.Schema.Types.ObjectId, ref: 'Review'
//     }
// ],
// });



app.post('/checkinstatus', async (req, res) => {
    const { startDate, endDate } = req.body;
    if(!startDate || !endDate){
        return res.status(200).send({error: 'Checkin and checkout dates required'});
    }
    try{
    const checkinDate = new Date(startDate);
    const checkoutDate = new Date(endDate);
    const overlappingBookings = await Booking.find({
        $or: [
            { checkin: { $lt: checkoutDate, $gte: checkinDate } },
            { checkout: { $gt: checkinDate, $lte: checkoutDate } },
            { checkin: { $lte: checkinDate }, checkout: { $gte: checkoutDate } }
        ]
    });
    const bookedPlaces = overlappingBookings.map((name)=> name.place);
    const availablePlaces = await Place.find({_id: {$nin: bookedPlaces}});
    res.json(availablePlaces);
}
catch(error){
    res.status(500).send({error: 'An error occured while fetching available places'});
}
});

// const BookingSchema = new mongoose.Schema({
//     place: {type: mongoose.Schema.Types.ObjectId, ref: 'Places'},
//     booker: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//     checkin: {type: Date, required: true},
//     guests: {type: Number, required: true},
//     checkout: {type: Date, required: true},
//     name: {type: String, required: true},
//     price: {type: Number, required: true}
// });

app.post('/bookedPlaces', async (req, res) => {
    const { id } = req.body;
    const checkinDate = new Date(Date.now());
    const response = await Booking.find({
        place: id, $or: [
            { checkin: { $gte: checkinDate } },
            { checkout: { $gte: checkinDate } }
        ]
    });
    res.json(response);

})



app.post('/user/profilepic/updation', async (req, res) => {
    const { temppic, user } = req.body;
    const theuser = await User.findById(user._id);
    theuser.profilepic = temppic;
    await theuser.save();
    res.json(theuser);
});


app.post('/procture', upload.single('avatar'), (req, res) => {
    let uploadedFiles = "";
    if (req.file !== undefined) {
        const { path, originalname } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles = newPath.replace('uploads\\', '');
        res.json(uploadedFiles);
    }
});

app.post('/upload', upload.array('photos', 40), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    };
    res.json(uploadedFiles);
})



app.listen(3000, () => {
    console.log("Listening on PORT 3000");
})

