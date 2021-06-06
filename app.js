const mongoose = require("mongoose");
const validator = require("validator");

//Connection to MongoDB and Creating new DB if not present
mongoose.connect("mongodb://127.0.0.1:27017/thapatech",  {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true })
.then(() => console.log("Connection successfull..."))
.catch((err) => console.log(err));

//A Mongoose schema defines the structure of the document
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: [2, "minimum 2 letters allowed"],
    },
    ctype: {
        type: String,
        required: true,
        enum: ["frontend", "backend", "database"]
    },
    videos: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error("Video(s) count should not negative");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    author: String,
    active: Boolean,
    date: {
        type:Date,
        default: Date.now
    } 
})

//A Mongoose model is a wrapper on the Mongoose schema.
const Playlist = new mongoose.model("Playlist", playlistSchema);


//Create docuemnt or insert
const createDocument = async () => {
    try{
        const jsPlaylist = new Playlist({
            name: "Javascript",
            ctype: "Front End",
            videos: 150,
            author: "Thapa Technical",
            active: true
        })

        const mongoPlaylist = new Playlist({
            name: "MongoDB",
            ctype: "Database",
            videos: 10,
            author: "Thapa Technical",
            active: true
        })

        const mongoosePlaylist = new Playlist({
            name: "Mongoose JS",
            ctype: "Database",
            videos: 4,
            email: "nako.co@m",
            author: "Thapa Technical",
            active: true
        })

        const expressPlaylist = new Playlist({
            name: "Express JS",
            ctype: "Back End",
            videos: 20,
            author: "Thapa Technical",
            active: true
        })

        //const result = await Playlist.insertMany([jsPlaylist, mongoPlaylist, mongoosePlaylist, expressPlaylist]);
        const result = await Playlist.insertMany([mongoosePlaylist]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

createDocument();

//Reading documents
const getDocument = async () => {
    try{ 
        const result = await Playlist
        .find({author:"Thapa Technical"})
        .select({name:1})
        .sort({name:-1})
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

//getDocument();

const updateDocument = async () => {
    try{
        const result = await Playlist.findByIdAndUpdate(
            {_id:"60b3bab16f4ec81ff8718a7d"}, 
            {$set : {name: "Javascript Thapa"}},
            {useFindAndModify: false, new: true}
        );
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

//updateDocument();


const deleteDocument = async () => {
    try{
        const result = await Playlist.findByIdAndDelete(
            {_id: "60b3b59e28bc633ae4f77d6d"}
        );
        console.log(result);
    }
    catch(err){
        conssole.log(err);
    }
}

//deleteDocument();