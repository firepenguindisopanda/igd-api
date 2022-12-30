const chai = require('chai');
const expect = chai.expect;
const { 
    knapsackProblem, 
    minCoinChange, 
    canPartition, 
    mergeSort,
    quickSort,
    quickSortRecursive 
} = require('../controllers/user.controller');

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

    describe('minCoinChange', () => {
        it('it should return 4 when number of coins: 3, coins: {1, 2, 3}, amount: 4', () => {
            let coins = [1, 2, 3];
            let amount = 4;
            let result = minCoinChange(coins, amount);
            expect(result).to.equal(4);
        })
    });

    describe('canPartition', () => {
        it('it should return true when nums: [1, 5, 11, 5]', () => {
            let nums = [1, 5, 11, 5];
            let result = canPartition(nums);
            expect(result).to.equal(true);
        })
        it('it should return false when nums: [1, 2, 3, 5]', () => {
            let nums = [1, 2, 3, 5];
            let result = canPartition(nums);
            expect(result).to.equal(false);
        })
    });

    describe("Merge Sort Testing", () => {
        it("it should return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] when array: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]", () => {
            let array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
            let result = mergeSort(array);
            expect(result).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        })
    });
    describe("Quick Sort Testing", () => {
        it("it should return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] when array: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]", () => {
            let array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
            let result = quickSort(array);
            expect(result).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        })
        it("it should return [0, 2, 2, 3, 5] when array: [0, 5, 3, 2, 2]", () => {
            let array = [0, 5, 3, 2, 2];
            let result = quickSort(array);
            expect(result).to.eql([0, 2, 2, 3, 5]);
        })
    });
    describe("Quick Sort Recursive Testing", () => {
        it("it should return [-2, 5, 0, -45] when array: [-45, -2, 0, 5]", () => {
            let array = [-45, -2, 0, 5];
            let result = quickSortRecursive(array);
            expect(result).to.eql([-45, -2, 0, 5]);
        })
    })
});