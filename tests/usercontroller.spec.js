const chai = require('chai');
const expect = chai.expect;
const { 
    knapsackProblem, 
    minCoinChange, 
    canPartition, 
    mergeSort,
    quickSort,
    quickSortRecursive,
    binarySearch,
    kmpSearch,
    longestCommonSubsequence,
    knapSackProblem
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
    });

    describe("Binary Search Testing", () => {
        it("it should return 3 when array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 4", () => {
            let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let target = 4;
            let result = binarySearch(array, target);
            expect(result).to.equal(3);
        })
        it("it should return -1 when array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target: 11", () => {
            let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let target = 11;
            let result = binarySearch(array, target);
            expect(result).to.equal(-1);
        })
    });

    describe("KMP Search Testing", () => {
        it("it should return 10 when text: 'ABABDABACDABABCABAB', pattern: 'ABABCABAB'", () => {
            let text = 'ABABDABACDABABCABAB';
            let pattern = 'ABABCABAB';
            let result = kmpSearch(text, pattern);
            expect(result).to.equal(10);
        })
        it("it should return -1 when text: 'ABABDABACDABABCABAB', pattern: 'ABABCABABCD'", () => {
            let text = 'ABABDABACDABABCABAB';
            let pattern = 'ABABCABABCD';
            let result = kmpSearch(text, pattern);
            expect(result).to.equal(-1);
        })
    })

    describe("Longest Common Subsequence Testing", () => {
        it("it should return 4 when text1: 'AGGTAB', text2: 'GXTXAYB'", () => {
            let text1 = 'AGGTAB';
            let text2 = 'GXTXAYB';
            let result = longestCommonSubsequence(text1, text2);
            expect(result).to.equal(4);
        })
    })

    describe("Knapsack Problem Testing", () => {
        it("it should return 220 when number of items: 3, weight of each item: {10, 20, 30}, value of each item: {60, 100, 120}, capacity: 50", () => {
            
            let capacity = 50;
            let weight = [10, 20, 30];
            let value = [60, 100, 120];
            let result = knapSackProblem(capacity, weight, value);
            expect(result).to.equal(220);
        })
        it("it should return 36 when number of items: 4, weight of each item: {24, 10, 10, 7}, value of each item: {24, 18, 18, 10}, capacity: 25", () => {
            let capacity = 25;
            let weight = [24, 10, 10, 7];
            let value = [24, 18, 18, 10];
            let result = knapSackProblem(capacity, weight, value);
            expect(result).to.equal(36);
        })
    });
});