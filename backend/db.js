const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://shammagarg18:Shamma123@food.r11t9qi.mongodb.net/foodappmern?retryWrites=true&w=majority';

const foodItemSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  options: [
    {
      half: String,
      full: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

const foodCategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
});

// Create a model using the schema
const Food_items = mongoose.model('Food_items', foodItemSchema);

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Use the model to find and fetch data
    const fetchedData = await Food_items.find({});
    console.log('Fetching data:', fetchedData);
    global.Food_items = fetchedData;
    
    // Querying foodCategory using Mongoose with the correct model name
    const FoodCategory = mongoose.model('food_categories', foodCategorySchema); // Use the correct model name
    const catData = await FoodCategory.find({});
    console.log('Fetching FoodCategory data:', catData);
    global.FoodCategory=catData;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = mongoDB;
