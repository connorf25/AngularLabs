module.exports = function(http) {
    let server = http.listen(3000, () => {
        let port = server.address().port;
        console.log("Server started");
        console.log("Server listening on port: " + port);
    })
}