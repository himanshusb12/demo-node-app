const { Unauthorized, NotFound } = require('http-errors');
let request = require(`supertest`);
let app = require('../app');

describe('Get all users data', function () {
    it('should returns all users info', function(done) {
        const expected_response = [
            {
                "id": 1,
                "name": "Himanshu",
                "age": 27
            },
            {
                "id": 2,
                "name": "Ishita",
                "age": 21
            },
            {
                "id": 3,
                "name": "Sachin",
                "age": 27
            },
            {
                "id": 4,
                "name": "Dhilan",
                "age": 28
            },
            {
                "id": 5,
                "name": "Anurag",
                "age": 24
            }
        ];
        request(app).get('/users/all').expect(expected_response).expect(200, done);
    });
});

describe('Get specific user data', function () {
    it('Successful response', function (done) {
        const expected_response = {
            "id": 1,
            "name": "Himanshu",
            "age": 27
        };
        request(app).get('/users/1').expect(expected_response).expect(200, done);
    });

    it('User not found', function (done) {
        const expected_response = {"message": "No such user exits"};
        request(app).get('/users/11').expect(expected_response).expect(200, done);
    });
})

describe('URL not found', function () {
    it('should give a 404 response', function (done) {
        request(app).get('/user/1').expect(404, done);
    });

})