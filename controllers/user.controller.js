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

/**
 * QuickSort implementation
 * @param {number[]} nums
 * @return {number[]}
 * @brief QuickSort is a divide and conquer algorithm, this will be used to sort numbers in ascending order.
 * Using the iterative approach
 */
exports.quickSort = (nums) => {
    let stack = [];
    stack.push(0);
    stack.push(nums.length - 1);
    while (stack.length > 0) {
        let end = stack.pop();
        let start = stack.pop();
        let pivot = partition(nums, start, end);
        if (pivot - 1 > start) {
            stack.push(start);
            stack.push(pivot - 1);
        }
        if (pivot + 1 < end) {
            stack.push(pivot + 1);
            stack.push(end);
        }
    }
    return nums;
};

const partition = (nums, start, end) => {
    let pivot = nums[end];
    let pIndex = start;
    for (let i = start; i < end; i++) {
        if (nums[i] <= pivot) {
            swap(nums, i, pIndex);
            pIndex++;
        }
    }
    swap(nums, pIndex, end);
    return pIndex;
}
const swap = (nums, i, j) => {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

exports.quickSortRecursive = (nums) => {
    if (nums.length <= 1) {
        return nums;
    }
    let pivot = nums[nums.length - 1];
    let left = [];
    let right = [];
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < pivot) {
            left.push(nums[i]);
        } else {
            right.push(nums[i]);
        }
    }
    return this.quickSortRecursive(left).concat(pivot, this.quickSortRecursive(right));
};

/**
 * Binary Search Implementation
 * @param {number[]} nums
 * @param {number} target
 * @return {number} index of val in array or return -1 if not found
 * Binary search works on sorted arrays
 * Worst-case time complexity: O(log n)
 * Best-case time complexity: O(1)
 * Average time complexity: O(log n)
 * Worst-case space complexity: O(1)
 * @brief Given a sorted array of n elements and a target, this function searches for target in the array using the binary search algorithm.
 * It returns the index in which the target is found or -1 if the target is not found.
 * Search the array by dividing the array into two halves and then comparing the target with the middle element of the array.
 * Set start index to 0 and end index to length of array - 1.
 * If the target is equal to the middle element, return the middle index.
 * If the target is greater than the middle element, then consider the right half of the array.
 * If the target is less than the middle element, then consider the left half of the array.
 */
exports.binarySearch = (nums, target) => {
    
    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
}

/**
 * KMP Search Implementation
 * @param {string} text
 * @param {string} pattern
 * @return {number} index of pattern in text or return -1 if not found
 * 
 */
exports.kmpSearch = (text, pattern) => {
    let lps = computeLPS(pattern);
    let i = 0;
    let j = 0;
    while (i < text.length) {
        if (text[i] == pattern[j]) {
            i++;
            j++;
        }
        if (j == pattern.length) {
            return i - j;
        } else if (i < text.length && text[i] != pattern[j]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return -1;
}

const computeLPS = (pattern) => {
    let lps = [];
    lps[0] = 0;
    let i = 1;
    let j = 0;
    while (i < pattern.length) {
        if (pattern[i] == pattern[j]) {
            j++;
            lps[i] = j;
            i++;
        } else {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

/**
 * Longest Common Subsequence Implementation
 */
exports.longestCommonSubsequence = (text1, text2) => {
    let dp = new Array(text1.length + 1).fill(0).map(() => new Array(text2.length + 1).fill(0));
    for (let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[text1.length][text2.length];
}

/**
 * 0 1 Knapsack Problem Implementation
 * Given weights and values of n items, put these in a knapsack
 * of capacity W to get the maximum value of the items in the knapsack.
 * 
 * i.e: Given two integer arrays values[0...n-1] and weights[0...n-1],
 * that represesnts the values of each n items andweights of each n items,
 * Also given an integer W which represents the capacity of the knapsack,
 * find the maximum value subset of values such that the sum of the weights of
 * the subset is smaller than or equal to W.
 * 0-1 property means an item is chosen as a whole either pick the item or not (*don't break the item)
 * @param {number} W
 * @param {number[]} wt
 * @param {number[]} val
 * @return {number} maximum value of the items in the knapsack
 */

exports.knapSackProblem = (W, wt, val) => {
    let dp = new Array(wt.length + 1).fill(0).map(() => new Array(W + 1).fill(0));
    for (let i = 1; i <= wt.length; i++) {
        for (let j = 1; j <= W; j++) {
            if (wt[i - 1] <= j) {
                dp[i][j] = Math.max(dp[i - 1][j], val[i - 1] + dp[i - 1][j - wt[i - 1]]);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[wt.length][W];
}

/**
 * Permutation String Implementation
 * @function Given two strings string1 and string2, return true if s2 contains the permutation of s1.
 * @param {string} s1 - the input string
 * @param {string} s2 - the input string
 * @return {boolean} true if s2 contains the permutation of s1, false otherwise
 */
exports.permutationString = (string1, string2) => {
    if (string1.length > string2.length) {
        return false;
    }
    let map = new Map();
    for (let i = 0; i < string1.length; i++) {
        if (map.has(string1[i])) {
            map.set(string1[i], map.get(string1[i]) + 1);
        } else {
            map.set(string1[i], 1);
        }
    }
    let count = map.size;
    let start = 0;
    let end = 0;
    while (end < string2.length) {
        if (map.has(string2[end])) {
            map.set(string2[end], map.get(string2[end]) - 1);
            if (map.get(string2[end]) == 0) {
                count--;
            }
        }
        end++;
        while (count == 0) {
            if (end - start == string1.length) {
                return true;
            }
            if (map.has(string2[start])) {
                map.set(string2[start], map.get(string2[start]) + 1);
                if (map.get(string2[start]) > 0) {
                    count++;
                }
            }
            start++;
        }
    }
    return false;
}

/**
 * Longest Palindromic Substring Implementation
 * @param {string} s
 * @return {string}
 */
exports.longestPalindromicSubstring = (s) => {
    let start = 0;
    let end = 0;
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i);
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
};
const expandAroundCenter = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}