module.exports = function (app) {
    app.get("/bokning/:year/:month", function (req, res) {
        var bookings = {
            year: req.params.year,
            month: req.params.month,
        };
        res.send(bookings);
    });
}

