if (Meteor.isClient) {

  Meteor.subscribe("newRestaurant");
  Meteor.subscribe("newItem");
  Template.home.events({

    "click #logout-link":function(event){

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
   		console.log("hello.is it me your looking for");
      event.preventDefault();
   		var username = event.target.username.value;
 		var password = event.target.password.value;
 		var check;
 		check=Meteor.loginWithPassword(username,password);
 		console.log(check + " " + Meteor.user());  	
   	},
   	});
   
   Template.signUp_page.events({
   	"submit.sign-up":function(event){
    event.preventDefault();
   	var userName = event.target.username.value;
 		var passWord = event.target.password.value;
    var password_again=event.target.password_again.value;
    
    if(passWord===password_again){
    Meteor.call("SignUp",userName,passWord);
    console.log("reached here?");
    }


    }
 		  	
   });

}