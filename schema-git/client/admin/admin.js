 
  Template.admin.helpers({

    
    restaurants:function(){

      console.log("comment allez vous?");
      return Restaurants.find();
    },
    validateForm:function () {
          
          $("#username-admin").keyup(function(){
           update();
          });

          function update() {
          $("#email-admin").val($('#username-admin').val());
          }

      },
    retrieveEmail:function(){

      var something= $("#usernmae-admin").val;
      console.log(something);

      },
      
    

});

  Template.admin.events({

    "submit [data-action=new-restaurant]":function(event) {


      event.preventDefault();
      
      var restaurant=event.target.restaurant.value;
      var user=event.target.username.value;
      var email=event.target.email.value;
      console.log(" " + restaurant + " " + user);
        Meteor.call("addRestaurant",restaurant,user,email,function(error,result){

          console.log("entered callback ");
         if(result)
          Meteor.call("sendEmail",email);

        });

        document.getElementById("idea").reset(); 
      
    },

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
    Meteor.call("insertItem",item,temp);
  },
  "blur [data-action=username-admin]":function(event){

    console.log("Entered blur");
    var un = $('.username-input').val();
    Meteor.call("fetchEmail", un, function(error,result){
      

       if(result)
      document.getElementById("email-input").value=result;
      else
      console.log(" What ?");
    });

  }
  
   
});

  