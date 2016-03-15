FlowRouter.triggers.enter([function(context,redirect){
	
}]);

FlowRouter.route('/', {
    name: 'to_home',
    action() {
      BlazeLayout.render('home');
         console.log("This is home");
    }
});
FlowRouter.route('/admin', {
    name: 'to_admin',
    action() {
    	if(!Meteor.userId())
		FlowRouter.go("to_home");
		else{
      	BlazeLayout.render('admin');
        console.log("This is admin");
        }
    }
});
FlowRouter.route('/user', {
    name: 'to_user',
    action() {
    	if(!Meteor.userId())
		FlowRouter.go("to_home");
	    else{            
	    BlazeLayout.render('user');
        console.log("This is user");
        }
    }
});
FlowRouter.route('/login', {
    name: 'to_login',
    action() {
	    BlazeLayout.render('home', {main:'login_page'});
        console.log("This is login");
    }
});
FlowRouter.route('/signUp', {
    name: 'to_signUp',
    action() {
	    BlazeLayout.render('home',{ main:'signUp_page'});
        console.log("This is signUp");
    }
});
FlowRouter.route('/reset-page', {
    name: 'to_set_pass',
    action() {
        BlazeLayout.render('reset');
        console.log("This is reset page");
    }
});
