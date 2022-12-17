const chai = require('chai');
const expect = chai.expect;
const { knapsackProblem } = require('../controllers/user.controller');

describe('User Controller', () => {
    describe('knapsackProblem', () => {
        it('it should return 220 when number of items: 3, weight of each item: {10, 20, 30}, value of each item: {60, 100, 120}, capacity: 50', () => {
            let n = 3;
            let capacity = 50;
            let weight = [10, 20, 30];
            let value = [60, 100, 120];
            let result = knapsackProblem(n, capacity, weight, value);
            expect(result).to.equal(220);
        })
    });
});