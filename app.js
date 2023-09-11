const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

function findHighestAlphabet(alphabets) {
    const sortedAlphabets = alphabets
        .filter((char) => /[a-zA-Z]/.test(char)) // Filter out non-alphabet characters
        .sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));
    return sortedAlphabets.length > 0 ? [sortedAlphabets[0]] : [];
}

app.post('/bhfl', (req, res) => {
    try {
        const requestData = req.body.data;

        // Validate the request body
        if (!requestData || !Array.isArray(requestData)) {
            throw new Error('Invalid or missing request data');
        }

        const userId = "john_doe_17091999"; // Sample user ID
        const collegeEmail = "john@xyz.com"; // Sample college email
        const collegeRollNumber = "ABCD123"; // Sample college roll number
        const numbers = requestData.filter((item) => !isNaN(item));
        const alphabets = requestData.filter((item) => /^[a-zA-Z]$/.test(item));

        // Find the highest alphabet
        const highestAlphabet = findHighestAlphabet(alphabets);

        // Prepare the response JSON with is_success field
        const response = {
            is_success: true,
            user_id: userId,
            email: collegeEmail,
            roll_number: collegeRollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error:', error.message);

        // Prepare an error response with is_success set to false
        res.status(400).json({ is_success: false, error: error.message });
    }
});

app.get('/bhfl',(req,res)=>{
    res.status(200).json({"operation_code":1});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
