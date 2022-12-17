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

exports.knapsackProblem = (capacity, items = []) => {
    const matrix = [];
    for (let i = 0; i < items.length; i++) {
        matrix[i] = [];
        for (let j = 0; j <= capacity; j++) {
            if (i === 0) {
                matrix[i][j] = 0;
            } else if (items[i].weight > j) {
                matrix[i][j] = matrix[i - 1][j];
            } else {
                matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i - 1][j - items[i].weight] + items[i].value);
            }
        }
    }
    return matrix;
}