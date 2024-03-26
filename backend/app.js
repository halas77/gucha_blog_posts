const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const path=require("path")
const connectDB = require("./config/db")

// import routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")



const app = express()


// middlewares
app.use(express.json())
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/posts", postRoute)


//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

// image route
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


dotenv.config()
port = process.env.PORT


app.listen(port, () => {
    connectDB()
    console.log(`The server is running in port ${port}` );
})