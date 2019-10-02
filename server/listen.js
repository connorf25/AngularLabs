module.exports = function(http, port) {
    let server = http.listen(port, () => {
        let running_port = server.address().port;
        console.log("Server started");
        console.log("Server listening on port: " + running_port);
    })
}