var path = require('path');
var friends = require('../data/friends.js');

module.exports = function(app){

    app.get('/api/friends', function(req, res){
        res.json(friends);
    });


    app.post('/api/friends', function(req, res){
        
        // make an object to hold best match
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
 
        // taking the result of the user's survey.
        var userData = req.body;
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;

        var totalDifference = 0; //will calculate the diff between each user 

        // looping through all friends
        for(var i=0; i<friends.length; i++){
            totalDifference = 0;

            // loop through each scores of each friend
            for(var j=0;j<friends[i].scores[j]; j++){
                // calculate the score difference and sum them in totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // if the sum of diff. less than diff of the current "best match"
                if(totalDifference <= bestMatch.friendDifference){
                    // make new bestmatch
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        friends.push(req.body);
        res.json(bestMatch);
    });
}

