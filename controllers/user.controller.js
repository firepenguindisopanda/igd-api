exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

/**
 * @brief Picking up all those items whose combined weight is below
 * the given capacity and calculating the value of those picked items. Trying all
 * possible combinations will yield the maximum knapsack value.
 * @param n size of the weight and value array
 * @param capacity capacity of the carrying bag
 * @param weight array representing the weight of items
 * @param value array representing the value of items
 * @return maximum value obtainable with a given capacity.
 */
exports.knapsackProblem = (n, capacity, weight, value) => {
    let matrix = [];
    for (let i = 0; i <= n; i++) {
        let row = [];
        for (let j = 0; j <= capacity; j++) {
            if (i == 0 || j == 0) {
                row.push(0);
            } else if (weight[i - 1] <= j) {
                row.push(Math.max(value[i - 1] + matrix[i - 1][j - weight[i - 1]], matrix[i - 1][j]));
            } else {
                row.push(matrix[i - 1][j]);
            }
        }
        matrix.push(row);
    }
    return matrix[n][capacity];
};

/**
 * You have m types of coins available in infinite quantities
where the value of each coins is given in the array S=[S0,... Sm-1]
Can you determine number of ways of making change for n units using
the given types of coins?
 */
exports.minCoinChange = (coins, amount) => {
    let combinations = [];
    for (let i = 0; i <= amount; i++) {
        combinations.push(0);
    }
    combinations[0] = 1;
    for (const element of coins) {
        for (let j = element; j <= amount; j++) {
            combinations[j] += combinations[j - element];
        }
    }
    return combinations[amount];
}

/**
 * Leetcode 416. Partition Equal Subset Sum
 * Given a non-empty array of only positive integers, find if the array can be
 * partitioned into two subsets such that the sum of elements in both subsets is
 * equal.
 * @param {number[]} nums
 * @return {boolean}
 */
exports.canPartition = (nums) => {
    // if sum is odd, then it cannot be partitioned into two equal sum subsets
    let sum = 0;
    let target = 0;
    for (const element of nums) {
        sum += element;
    }
    if (sum % 2 != 0) {
        return false;
    }
    // if sum is even, then find a subset of array with sum equal to half of total sum
    target = sum / 2;
    // create a set to store the sum of all the subsets
    let set = new Set(); // set is used to store the sum of all the subsets
    set.add(0); // add 0 to the set
    for (const element of nums) {   // iterate through all the elements of the array
        let temp = new Set();   // create a temporary set to store the sum of all the subsets
        for (const item of set) {   // iterate through all the elements of the set
            if (item + element == target) { // if the sum of the current item in the set variable and the current element from the nums array is equal to target, return true
                return true;    // return true
            }
            temp.add(item + element);   // add the sum of the current item in the set variable and the current element from the nums array to the temp set variable
        }
        for (const item of temp) {  // iterate through all the elements of the temp set
            set.add(item);  // add the current item in the temp set to the set variable
        }
    }
    return false;   // return false
};

/**
 * Merge sort
 * @param {number[]} nums
 * @return {number[]}
 * @brief Merge sort is a divide and conquer algorithm, this will be used to sort numbers in ascending order.
 */
exports.mergeSort = (nums) => {
    if (nums.length <= 1) {
        return nums;
    }
    let mid = Math.floor(nums.length / 2);
    let left = nums.slice(0, mid);
    let right = nums.slice(mid);
    return merge(this.mergeSort(left), this.mergeSort(right));
};

// helper function to merge two sorted arrays
const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}