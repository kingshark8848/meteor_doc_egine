if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        var template = 'Hello {{ name }}!';
        //console.log(Mustache);
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, {name: "Luke"});
        console.log("=====simple test=====")
        console.log(rendered);

        console.log("=====test: read template file=====")
        var fs = Npm.require('fs');
        //console.log(fs);
        //console.log(process.cwd());
        fs.readFile('../../../../../template_test1.txt',function(err,data){
            if (err) {
                return console.error(err);
            };
            template = data.toString();
            Mustache.parse(template);   // optional, speeds up future uses
            rendered = Mustache.render(template,viewRule);
            console.log(rendered);
        })

    });
}
var contract1={
    u_country:"USA",
    u_state:"California"
};

var contract2={
    u_country:"British"
}

var contract=contract1;

var viewRule={
    countryHasState:["USA","China"],
    country: contract.u_country,
    state: contract.u_state,
    hasState: function(){
        var country = this.country;
        return this.countryHasState.some(function(e){
            return e === country
        }
    )}
}