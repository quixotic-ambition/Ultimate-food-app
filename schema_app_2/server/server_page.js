if (Meteor.isServer) {
	Meteor.startup(function () {
    // code to run on server at startup
    	process.env.MAIL_URL='smtp://postmaster%40sandbox565bf40430da4f1ea8afa41ad94ffd6c.mailgun.org:5d601e5cb55fa35d944329a805edc0e7@smtp.mailgun.org:587'
    if(Meteor.users.find().count()<1){
    	var id=Accounts.createUser({
    		username:'Admin',
    		password:'000000',
    		profile:{name:'Administrator'}
    	});

    	console.log("Startup User Creation", id);
    	Roles.addUsersToRoles(id,['admin']);

    }
});

	Meteor.publish("newRestaurant",function(){

		return Restaurants.find();
	});
	Meteor.publish("newItem",function(){

		return Items.find();
	});

}

Meteor.methods({

	newUser:function(flag){

		if(flag===true)
			Roles.addUsersToRoles(Meteor.userId(),['default']);
	},

	addRestaurant:function (restaurant,user,email) {

		var r = Restaurants.insert({
			restaurant: restaurant, 
			userName: user
		});


		temp=Accounts.createUser({
			username:user,
			email:email
		});

		return temp;
	},   


	insertItem:function(item,restId){

		Items.insert({

			itemName:item,
			restaurantId:restId
		});

	},

	SignUp:function(username,password){

		Accounts.createUser({
			username:username,
			password:password
		});
	},
	sendEmail:function(toEmail)
	{
		console.log("right hand up");
		Email.send({
			to:toEmail,
			from:'arun@the_boss.awesome',
			subject:"Welcome to the club!!",
			html: '<a href="http://localhost:3000/signUp">here</a>'

		});
		// throw new Meteor.Error( "Email-verificationIsh", 'Sent email' );
        

	},
	fetchEmail:function(un)
	{
		console.log("yo yo yo");
		var temp= Accounts.findUserByUsername(un);
		if(temp)
		{
			console.log(temp.emails[0].address);
			var temp2=temp.emails[0].address;
			return temp2;
		} 
	}

});	
