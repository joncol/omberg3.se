module.exports = function (app) {
    app.get("/bokning/:year/:month", function (req, res) {
        var bookings = [
            {
                startDate: "2014-09-02",
                endDate: "2014-09-05",
                name: "joCo"
            },
            {
                startDate:  "2014-09-12",
                endDate:  "2014-09-18",
                name: "mofo"
            },
            {
                startDate: "2014-09-30",
                endDate: "2014-09-30",
                name: "yoyo"
            },
        ];
        res.send(bookings);
    });
}

