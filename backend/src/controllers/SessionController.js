

module.exports= {
    async store(request, response) {
        return request.json({message: 'Hello World!!'});
    }
}