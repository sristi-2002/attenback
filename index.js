
// // final//.............................

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";

// const app = express();
// const PORT = 9002;

// mongoose
//   .connect(
//     "mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error(`MongoDB connection error: ${err}`);
//   });

// app.use(express.json());
// app.use(cors());

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: String,
//   selectedDates: [Date],
// });

// const User = mongoose.model("User", userSchema);

// app.get("/", (req, res) => {
//   res.send("Hi, the srevr is running");
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && user.password === password) {
//       // User found and password matches, send success message and user details
//       res
//         .status(200)
//         .json({
//           message: "Login successful",
//           name: user.name,
//           email: user.email,
//           selectedDates: user.selectedDates
//         });
//     } else {
//       // User not found or password doesn't match, send 401 Unauthorized status and error message
//       console.log("email : ", email);

//       // console.log('Date:' selectedDate);
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     // Internal server error, send 500 status and error message
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.post("/employee", async (req, res) => {
//   try {
//     const { name, email, password, selectedDates } = req.body;
//     const newUser = new User({ name, email, password, selectedDates });
//     await newUser.save();
//     console.log("username : ", name);
//     console.log("email : ", email);
//     console.log("selectedDates: ", selectedDates);
//     res
//       .status(201)
//       .json({ message: "User created successfully", name: name, email: email, selectedDates: user.selectedDates });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.post("/ProfilePage", async (req, res) => {
//   try {
//     const { email, selectedDate } = req.body;

//     // Convert selectedDate string to Date object
//     var formattedDate = new Date(selectedDate);

//     // Calculate the next date by adding one day to the selected date
//     const nextDate = new Date(formattedDate);
//     nextDate.setDate(formattedDate.getDate() + 1);

//     // Format the next date
//     const formattedNextDate = nextDate.toISOString().split("T")[0];

//     console.log(req.body);
//     console.log("email : ", email); // Added missing comma
//     console.log("Date:", formattedNextDate); // Added missing semicolon
//     // Find the user by email and update their selectedDates array
//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       { $push: { selectedDates: formattedNextDate } }, // Add the selectedDate to the selectedDates array
//       { new: true } // Return the updated document
//     );

//     // Send the updated user object in the response
//     res
//       .status(200)
//       .json({
//         message: "Selected date updated successfully",
//         user: updatedUser,
//       });
//   } catch (error) {
//     console.error("Error updating selected date:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started at port ${PORT}`);
// });








//subha........................................................


import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 9002;

mongoose.connect("mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log(`MongoDB connected`);
    })
    .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
    });


app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    selectedDates: [Date]
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.send("Hi, the srevr is running");
  });


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            // User found and password matches, send success message and user details
            res.status(200)
            .json({ message: "Login successful",
            name: user.name,
             email: user.email });
        } else {
            // User not found or password doesn't match, send 401 Unauthorized status and error message
           console.log('email : ' , email)
          

           // console.log('Date:' selectedDate);
             res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        // Internal server error, send 500 status and error message
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/employee", async (req, res) => {
    try {
        const { name, email, password, selectedDates } = req.body;
        const newUser = new User({ name, email, password, selectedDates });
        await newUser.save();
        console.log('username : ', name);
        console.log('email : ', email);
        console.log('selectedDates: ', selectedDates);
        res
        .status(201)
        .json({ message: "User created successfully", name: name, email: email, selectedDates: user.selectedDates });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




app.post("/ProfilePage", async (req, res) => {
    try {
        const { email, selectedDate } = req.body;
       
        // Convert selectedDate string to Date object
        const formattedDate = new Date(selectedDate);

        const nextDate = new Date(formattedDate);
        nextDate.setDate(formattedDate.getDate() + 1);

        const formattedNextDate = nextDate.toISOString().split("T")[0];

        console.log(req.body);
        console.log('email : ', email); // Added missing comma
        console.log('Date:', selectedDate); // Added missing semicolon
           // Find the user by email and update their selectedDates array
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $push: { selectedDates: formattedDate } }, // Add the selectedDate to the selectedDates array
            { new: true } // Return the updated document
        );

        // Send the updated user object in the response
        res.status(200).json({ message: "Selected date updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating selected date:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});








// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';


// const app = express();
// const PORT = 9002;

// mongoose.connect("mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0")
   
// .then(() => {
//         console.log(`MongoDB connected`);
//     })
//     .catch((err) => {
//         console.error(`MongoDB connection error: ${err}`);
//     });


// app.use(express.json());
// app.use(cors());

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: {
//         type: String,
//         unique: true
//     },
//     password: String,
//     selectedDates: [Date]
// });

// const User = mongoose.model("User", userSchema);
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (user && user.password === password) {
//             // User found and password matches, send success message and user details
//             res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
//         } else {
//             // User not found or password doesn't match, send 401 Unauthorized status and error message
//             res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         // Internal server error, send 500 status and error message
//         console.error("Error logging in:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// app.post("/employee", async (req, res) => {
//     try {
//         const { name, email, password, selectedDates } = req.body;
//         const newUser = new User({ name, email, password, selectedDates });
//         await newUser.save();
//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// app.post("/ProfilePage", async (req, res) => {
//     try {
//         const { email, selectedDate } = req.body;
       
//         // Convert selectedDate string to Date object
//         const formattedDate = new Date({ email,selectedDate});
//  console.log(selectedDate);
//  await formattedDate.save();
//         // Find the user by email and update their selectedDates array
//         const updatedUser = await User.findOneAndUpdate(
//             { email },
//             { $push: { selectedDates: formattedDate } }, // Add the selectedDate to the selectedDates array
//             { new: true } // Return the updated document
//         );

//         // Send the updated user object in the response
//         res.status(200).json({ message: "Selected date updated successfully", user: updatedUser });
//     } catch (error) {
//         console.error("Error updating selected date:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


// app.listen(PORT, () => {
//     console.log(`Server started at port ${PORT}`);
// });














// // import express from 'express';
// // import cors from 'cors';
// // import mongoose from 'mongoose';

// // const app = express();
// // const PORT = 9002;
// // mongoose.connect("mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0")
// //     .then(() => {
// //         console.log(`MongoDB connected`);
// //     })
// //     .catch((err) => {
// //         console.error(`MongoDB connection error: ${err}`);
// //     });


// // app.use(express.json());
// // app.use(cors());

// // const userSchema = new mongoose.Schema({
// //     name: String,
// //     email: {
// //         type: String,
// //         unique: true
// //     },
// //     password: String,
// //     selectedDates: [Date]
// // });

// // const User = mongoose.model("User", userSchema);

// // app.post("/login", async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
// //         const user = new User({ email, password });
// //         if (user) {
// //             res.status(200).json({ message: "Login successful", user });
// //         } else {
// //             res.status(401).json({ message: "Invalid email or password" });
// //         }
// //     } catch (error) {
// //         console.error("Error logging in:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });

// // app.post("/employee", async (req, res) => {
// //     try {
// //         const { name, email, password, selectedDates } = req.body;
// //         const newUser = new User({ name, email, password, selectedDates });
// //         await newUser.save();
// //         res.status(201).json({ message: "User created successfully" });
// //     } catch (error) {
// //         console.error("Error creating user:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });
// // //...........


// // app.post("/ProfilePage", async (req, res) => {
// //     try {
// //         const { selectedDate } = req.body;
// //         const formattedDate = new Date(selectedDate); // Convert ISO string back to Date object
// //         const updatedUser = await User.findOneAndUpdate({}, { $push: { selectedDates: formattedDate } }, { new: true });
// //         res.status(200).json({ message: "Selected date updated successfully", user: updatedUser });
// //     } catch (error) {
// //         console.error("Error updating selected date:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });

// // // app.post("/ProfilePage", async (req, res) => {
// // //     try {
// // //         const { email, selectedDates } = req.body;
// // //         const updatedUser = await User.findOneAndUpdate({ email }, { $push: { selectedDates } }, { new: true });
// // //         res.status(200).json({ message: "Selected dates updated successfully", user: updatedUser });
// // //     } catch (error) {
// // //         console.error("Error updating selected dates:", error);
// // //         res.status(500).json({ message: "Internal server error" });
// // //     }
// // // });

// // app.listen(PORT, () => {
// //     console.log(`Server started at port ${PORT}`);
// // });












// import  express  from "express";
// import cors from "cors"
// import mongoose from "mongoose";
// //const mongoose = require('mongoose');

// //const DB = 'mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0'
// //node ee import hoi nahh. require korte hoi paqckage
// mongoose.connect("mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0", {
//     // useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useUnifiedTopology: true,
//     // useFindAndModify: false
// }).then(() => {
//     console.log(`connection successful`);

// }).catch((err) => console.log(`no connection`));
// const app = express()
// app.use(express.json())
// // app.use(express.urlencoded())
// app.use(cors())


// /** */
// //...............

// // Modify the User Schema to include selected dates
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: {
//         type: String,
//         unique: true
//     },
//     password: String,
//     selectedDates: [Date] // New field to store selected dates
// });


// // const userSchema = new mongoose.Schema({
// //     name:String,
// //     email: String,
// //     password: String
// // })

// const User = new mongoose.model("User", userSchema)
// /**/ 

// app.get("/", (req, res)=>{
//     res.send("My API Server")
// })

// //..............................

// // app.post("/login", async (req, res) => {
// //     const { email, password } = req.body;
// //     User.findOne({email, email},(err, user) => {
// //         if(user){
// //             if(password === user.password){
// //                 res.send({message: "Login Successfull", user: user})
// //             }
// //             else{
// //                 res.send({message: "password didnot match"})
// //             }
// //         }
// //         else{
// //             res.send({message: "User not registered"})
// //         }
// //     })
// // });



// app.post("/login", (req, res)=>{
//     res.send("My API Server Login")
//     console.log(req.body)
//     const { email, password } = req.body;
//     //.....

//     const newUser = new User({ 
       
//         email, 
//         password 
//     });

//     // Save the new user to the database
//     newUser.save()
//         .then(() => {
//             console.log("User created successfully");
//             res.status(201).json(res);
            
//         })
//         .catch((error) => {
//             console.error("Error creating user:", error);
//             res.status(500).json({ message: "Internal server error" });
//         });
// })

// //............

// // Update the user registration route (/register) to save selected dates
// app.post("/employee", async (req, res) => {
//     const { name, email, password, selectedDates } = req.body;
//     try {
//         const newUser = new User({ name, email, password, selectedDates });
//         await newUser.save();
//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


// //.........
// app.post("/ProfilePage", async (req, res) => {
//     const { email, selectedDates } = req.body;
//     try {
//         // Find the user by email
//         const updatedUser = new User(
//             {email,
//             selectedDates },
//             // Return the updated document
//         );
//         updatedUser.save();
//         // Send the updated user object in the response
//         res.status(200).json({ message: "Selected dates updated successfully", user: updatedUser });
//     } catch (error) {
//         console.error("Error updating selected dates:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// app.listen(9002, () =>{
//     console.log("BE started at port 9002")
// })
























// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';

// const app = express();
// const PORT = 9002;
// mongoose.connect("mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0")
//     .then(() => {
//         console.log(`MongoDB connected`);
//     })
//     .catch((err) => {
//         console.error(`MongoDB connection error: ${err}`);
//     });


// app.use(express.json());
// app.use(cors());

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: {
//         type: String,
//         unique: true
//     },
//     password: String,
//     selectedDates: [Date]
// });

// const User = mongoose.model("User", userSchema);


// app.post("/login", (req, res)=>{
//     res.send("My API Server Login")
//     console.log(req.body)
//     const { email, password } = req.body;
//     //.....

//     const newUser = new User({ 
       
//         email, 
//         password 
//     });

//     // Save the new user to the database
//     newUser.save()
//         .then(() => {
//             console.log("User created successfully");
//             res.status(201).json(res);
            
//         })
//         .catch((error) => {
//             console.error("Error creating user:", error);
//             res.status(500).json({ message: "Internal server error" });
//         });
// })

// app.post("/employee", async (req, res) => {
//     try {
//         const { name, email, password, selectedDates } = req.body;
//         const newUser = new User({ name, email, password, selectedDates });
//         await newUser.save();
//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });
// //...........


// app.post("/ProfilePage", async (req, res) => {
//     try {
//         const { selectedDate } = req.body;
//         console.log(selectedDate);
//         const formattedDate = new Date(selectedDate); // Convert ISO string back to Date object
//         const updatedUser = await User.findOneAndUpdate({}, { $push: { selectedDates: formattedDate } }, { new: true });
//         res.status(200).json({ message: "Selected date updated successfully", user: updatedUser });
//     } catch (error) {
//         console.error("Error updating selected date:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });









// // app.post("/ProfilePage", async (req, res) => {
// //     try {
// //         const { email, selectedDates } = req.body;
// //         const updatedUser = await User.findOneAndUpdate({ email }, { $push: { selectedDates } }, { new: true });
// //         res.status(200).json({ message: "Selected dates updated successfully", user: updatedUser });
// //     } catch (error) {
// //         console.error("Error updating selected dates:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });

// app.listen(PORT, () => {
//     console.log(`Server started at port ${PORT}`);
// });

