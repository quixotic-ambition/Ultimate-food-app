// Accounts.onRestPasswordLink = function(token,done) {
//   console.log("is there a point to all this??", token);
//   alert("ASD")
// };

  
if (Meteor.isClient) {

  Meteor.subscribe("newRestaurant");
  Meteor.subscribe("newItem");
  Template.home.events({
    "click #logout-link":function(event) {
      Meteor.logout();
    }
  });



 Template.login_page.helpers({
 	isNewUser:function(){
      var flag=false;
      console.log("running new user");
      Meteor.users.find().forEach( function(myDoc) {

        if(myDoc.roles!='admin')
          flag=true;

      });
      if(flag===true){ 
	      Meteor.call("newUser",flag);
	      FlowRouter.go("/user");
      	}
      else
      	FlowRouter.go("/admin"); 

    },
 });

   Template.login_page.events({
   	"submit.login":function(event){
   		
      event.preventDefault();
   		var username = event.target.username.value;
 		var password = event.target.password.value;
 		var check;
 		check=Meteor.loginWithPassword(username,password);
 		console.log(check + " " + Meteor.user());  	
   	},

    "click #forgot-link":function(event){

      event.preventDefault();
      console.log(" forgot link function ");
      var username = $('#username').val();
      if(username)
        Meteor.call("resetEmail",username,function(error,result){

          FlowRouter.go("/reset-page");
        });
      else
        alert("please enter username");
    },
    
   	});

}