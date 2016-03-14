Template.user.helpers({

    isNewUser:function(){
      var flag=false;
      Meteor.users.find().forEach( function(myDoc) {

        if(myDoc.roles!='admin')
          flag=true;

      }); 
      Meteor.call("newUser",flag); 

    },
    restaurants:function(){

      console.log("comment allez vous?");
      return Restaurants.find();
    },

    isOwner:function(){

      var userName;
      Meteor.users.find().forEach(function(loopUser){

        if(loopUser._id===Meteor.userId())
          userName=loopUser.username;
      });

      if(this.userName===userName)
        return true;
      
    },

    items:function(){
      
          return Items.find();
      
    },

    check_items:function(){
      if(this.restaurantId===Session.get("restId"))
      {
        return this.itemName;
      }


    },

    restaurant_items:function()
    {
    // console.log("Restaurant name");
    // console.log(Session.get("restId"));
    var hope= Restaurants.findOne(Session.get("restId"));
    var name_hope=hope.restaurant;
    console.log(name_hope);
    return name_hope;
  },

  matches:function(){

    var temp=Match.test(Session.get("restId"),String);
    console.log(temp);
    return temp;
  }

});
Template.user.events({
    "click [data-action=rest_add_item]":function(event) {

     // event.preventDefault();
     Session.set('restId',this._id);
     console.log(Session.get("restId"));

   },
   "submit [data-action=new-item]":function(event){

     event.preventDefault();
    var item=event.target.itemes.value;
    console.log("Inserting");
    var temp=Session.get("restId");
    console.log(temp);
    Meteor.call("insertItem",item,temp);
  },
  
  "click [data-action=logout]":function(event){

    console.log("entered logout");
    Meteor.logout();
    
  },
});