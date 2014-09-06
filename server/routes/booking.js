module.exports = function (app) {
    app.get("/bokning/:year/:month", function (req, res) {
        var bookings = [
            {
                startDay: 2,
                endDay: 5,
                name: "joCo"
            },
            {
                startDay: 12,
                endDay: 18,
                name: "mofo"
            },
            {
                startDay: 23,
                endDay: 23,
                name: "yoyo"
            },
        ];
        res.send(bookings);
    });
}

