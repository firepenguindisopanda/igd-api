const chai = require('chai');
const expect = chai.expect;

describe('User Controller', () => {
    describe('knapsackProblem', () => {
        it('should return correct matrix', () => {
            const capacity = 5;
            const items = [
                { weight: 1, value: 1 },
                { weight: 2, value: 6 },
                { weight: 3, value: 10 },
                { weight: 2, value: 3 }
            ];
            const matrix = [
                [0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1],
                [0, 1, 6, 7, 7, 7],
                [0, 1, 6, 10, 11, 16],
                [0, 1, 6, 10, 11, 16]
            ];
            expect(knapsackProblem(capacity, items)).to.deep.equal(matrix);
        });
    });
});