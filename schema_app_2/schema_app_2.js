Restaurants = new Mongo.Collection("restaurants");
Items=new Mongo.Collection("items");
Restaurants.attachSchema(new SimpleSchema({
  restaurant: {
    type: String,
    label: "restaurant",
    max: 20
  },
  userName:{
    type:String
  },
}));
Items.attachSchema(new SimpleSchema({

  itemName:{
    type:String 
  },
  restaurantId:{
    type:String
  }

}));
