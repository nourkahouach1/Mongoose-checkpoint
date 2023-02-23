const express = require('express')
const connectDB=require('./config/connectDB')
const Person = require ('./models/Person')
const app = express()


require ('dotenv').config()
console.log(process.env.MONGO_URI)


// create and Save a person 

const CreatePerson=async()=>{
  try {
  const person=new Person({ name: 'Marie', age: 30, favoriteFoods: ['burritos', 'sushi'] })
   console.log(person);
   await person.save()
   console.log("person added sucess");
  } 
  catch (error) {
      console.log(error);
  }
}
//Create many people
const createPeople = async () => {
  try {
    await Person.create(arrayOfPeople);
    console.log('People added successfully');
  } catch (error) {
    console.log(error);
  }
}
//Find people by name
const FindPeopleByName=async()=>{
  try {
    const per= await Person.find({name:"Jane"}) 
     console.log(per);
  } catch (error) {
      console.log(error);
  }
}
//Use model.findOne() 
const FindByFood=async(food)=>{
  try {
    const oneFood= await Person.findOne({favoriteFoods:food}) 
     console.log(oneFood);
  } catch (error) {
      console.log(error);
  }
}
//Use model.findById() 
const FindByID=async(idPerson)=>{
  try {
    const personId= await Person.findById({_id:idPerson}) 
     console.log(personId);
  } catch (error) {
      console.log(error);
  }
}
//Classic Updates 

var AddAndSave=async(idPerson)=>{
  try {
      const itemToAdd= await Person.findById({_id:idPerson}) 
     itemToAdd.favoriteFoods.push('Humburger');
     await itemToAdd.save()
     console.log('Humberger Added');
  } catch (error) {
      console.log(error);
  }
}
//Perform New Updates
var FindAndUpdate=async(personName,age )=>{
  try {
   const updated=await Person.findOneAndUpdate({name:personName}, {age:age}, {new:true})
      console.log(updated);
  } catch (error) {
      console.log(error);
  }
}

//Delete One Document
var findByIdAndRemove=async(idPerson)=>{
  try {
      const person=await Person.findByIdAndRemove({_id:idPerson})  
      console.log(person); 
  } catch (error) {
      console.log(error);
  }
}
//Delete Many Documents
var removeManyPeople=async()=>{
  try {
      const person=await Person.deleteMany({ name: 'Jim' }) 
      console.log("Jim has been deleted"); 
  } catch (error) {
      console.log(error);
  }
}
//Chain Search Query Helpers
var queryChain = async () => {
  try {
    const person = await Person.find({ favoriteFoods: 'burritos' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age')
      .exec((err, people) => {
        if (err) return handleError(err);
        console.log(people);
      });
  } catch (error) {
    console.log(error);
  }
};

queryChain();
removeManyPeople()
findByIdAndRemove()
FindAndUpdate()
AddAndSave()
FindByID()
FindByFood()
FindPeopleByName()
createPeople()
CreatePerson()
connectDB();


app.listen(port, (err) => err? console.log(err):console.log(`app listening on port ${port}!`))