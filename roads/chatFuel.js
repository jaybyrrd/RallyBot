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

    app.get('/chatfuel/testgallery', function (req, res) {
        var ref = req.query.ref;

        console.log(JSON.stringify(ref));
        // res.sendStatus(200);
        res.json({
            "messages": [
                {
                    "attachment":{
                        "type":"template",
                        "payload":{
                            "template_type":"generic",
                            "elements":[
                                {
                                    "title":"Classic White T-Shirt",
                                    "image_url":"http://petersapparel.parseapp.com/img/item100-thumb.png",
                                    "subtitle":"Soft white cotton t-shirt is back in style",
                                    "buttons":[
                                        {
                                            "type":"web_url",
                                            "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                                            "title":"View Item"
                                        },
                                        {
                                            "type":"web_url",
                                            "url":"https://petersapparel.parseapp.com/buy_item?item_id=100",
                                            "title":"Buy Item"
                                        }
                                    ]
                                },
                                {
                                    "title":"Classic Grey T-Shirt",
                                    "image_url":"http://petersapparel.parseapp.com/img/item101-thumb.png",
                                    "subtitle":"Soft gray cotton t-shirt is back in style",
                                    "buttons":[
                                        {
                                            "type":"web_url",
                                            "url":"https://petersapparel.parseapp.com/view_item?item_id=101",
                                            "title":"View Item"
                                        },
                                        {
                                            "type":"web_url",
                                            "url":"https://petersapparel.parseapp.com/buy_item?item_id=101",
                                            "title":"Buy Item"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]
        });
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
