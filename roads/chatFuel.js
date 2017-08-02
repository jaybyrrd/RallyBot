module.exports = function(app) {

    // app.post('/getGames', function(req, res) {
    //     var facebookId = req.body.facebookId;
    //
    //     getGames.getGames(facebookId, function(value, found, token) {
    //         res.status(value);
    //         res.json(found);
    //     });
    // });

    app.post('/chatfuel/webhook', function (req, res) {
        var data = req.body;

        console.log(JSON.stringify(data));
        // res.sendStatus(200);
        res.json(
            {
                // messages: [],
                set_attributes: {
                    cb_recommendation_1:"hello",
                    cb_recommendation_2:"hello",
                    cb_recommendation_3:"hello",
                    cb_recommendation_4:"hello",
                    cb_recommendation_5:"hello",
                },
                // redirect_to_blocks: {}
            }
        );
    });


    app.get('/chatfuel/joingame', function (req, res) {
        var ref = req.query.ref;

        console.log(JSON.stringify(ref));
        // res.sendStatus(200);
        res.json({test:123});
    });

    app.get('/chatfuel/getrecommendations', function (req, res) {
        var ref = req.query.ref;

        console.log(JSON.stringify(ref));
        // res.sendStatus(200);
        res.json(
            {
                // messages: [],
                set_attributes: {
                    cb_recommendations:"hello"
                },
                // redirect_to_blocks: {}
            }
        );
    });
};
