const mongoose = require('mongoose')
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const recipes = require('./data')
const recipe = require('./recipe')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

const successInsertHandler = (data) => {
  console.log('\nSuccesful recipe insertion: \n')
  for (const recipe of data) console.log(recipe.title)
}
const successUppdateHandler = (data) =>
  console.log('\nRecipe: ' + data.title + ' updated\n')

const successDeleteHandler = (data) => {
  if (data) console.log('\nRecipe successfuly deleted\n')
  else console.log('\nRecipe to be deleted could not be found\n')
}

// Connection to the database "recipe-app"
const createRecipe = async () => {
  try {
    // CONNECT
    await mongoose.connect(MONGODB_URI, {})

    // SINGLE RECIPE
    const recipeFromDb = await Recipe.create(recipe)
    successInsertHandler(recipeFromDb)

    // MULTIPLE RECIPES
    const recipesFromDb = await Recipe.insertMany(recipes)
    successInsertHandler(recipesFromDb)

    // UPDATING A SINGLE DOCUMENT
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 6 },
      { new: true },
    )
    successUppdateHandler(updatedRecipe)

    //DELETING A SINGLE DOCUMENT
    const deletedRecipe = await Recipe.findOneAndDelete({
      title: 'Carrot Cake',
    })
    successDeleteHandler(deletedRecipe)
  } catch (err) {
    console.log('An error occurred', err.message)
  } finally {
    //Ready states
    // 0: disconnected
    // 1: connected
    // 2: connecting
    // 3: disconnecting

    //console.log(mongoose.connection.readyState)
    //if (mongoose.connection.readyState === 1)
    mongoose.connection.close()
    //console.log(mongoose.connection.readyState)
  }
}

createRecipe()
