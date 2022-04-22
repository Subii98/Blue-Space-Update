import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  counter: Number,
  name: String,
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
