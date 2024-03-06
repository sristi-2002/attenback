import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 9002;

mongoose
  .connect(
    "mongodb+srv://Sristi2002:Sristi2002@cluster0.sqvsm6g.mongodb.net/list?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected");
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
    unique: true,
  },
  password: String,
  selectedDates: [Date],
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
     
      res
        .status(200)
        .json({
          message: "Login successful",
          name: user.name,
          email: user.email,
          selectedDates: user.selectedDates
        });
    } else {
       console.log("email : ", email);

      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/employee", async (req, res) => {
  try {
    const { name, email, password, selectedDates } = req.body;
    const newUser = new User({ name, email, password, selectedDates });
    await newUser.save();
    console.log("username : ", name);
    console.log("email : ", email);
    console.log("selectedDates: ", selectedDates);
    res
      .status(201)
      .json({ message: "User created successfully", name: name, email: email, selectedDates:selectedDates });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/ProfilePage", async (req, res) => {
  try {
    const { email, selectedDate } = req.body;
 var formattedDate = new Date(selectedDate);
  const nextDate = new Date(formattedDate);
    nextDate.setDate(formattedDate.getDate() + 1);
  const formattedNextDate = nextDate.toISOString().split("T")[0];

    console.log(req.body);
    console.log("email : ", email); 
    console.log("Date:", formattedNextDate); 
      const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { selectedDates: formattedNextDate } }, 
      { new: true } 
    );

   
    res
      .status(200)
      .json({
        message: "Selected date updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Error updating selected date:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
