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