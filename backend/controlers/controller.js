const db = require('../config/db'); // Import database connection

const submitForm = async (req, res) => {
    try {
        console.log('Incoming request body:', req.body); // Log the request body for debugging

        const {
            parent_name,
            phone_number,
            email,
            number_of_children,
            address,
            children_info,
            program_choice,
            additional_notes
        } = req.body; // Extract form data from the request body

        // Perform validation (example: check required fields)
        if (!parent_name || !phone_number || !email || !number_of_children || !address || !children_info || !program_choice) {
            console.error('Validation failed: Missing required fields');
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        // Insert data into the database
        const query = `INSERT INTO form_app (parent_name, phone_number, email, number_of_children, address, children_info, program_choice, additional_notes, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
        const values = [parent_name, phone_number, email, number_of_children, address, children_info, program_choice, additional_notes];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'An error occurred while saving the form data.' });
            }

            console.log('Database insert result:', result); // Log the result for debugging

            // Respond with success
            res.status(200).json({ 
                message: 'Form submitted successfully!', 
                data: req.body 
            });
        });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'An error occurred while submitting the form.' });
    }
};
const getForms = (req, res) => {
    try {
        const { program_choice } = req.query; // Extract query parameter
        let query = 'SELECT * FROM form_app';
        const values = [];

        if (program_choice) {
             query += ' WHERE program_choice = ?'; // Removes LOWER()
            values.push(program_choice); // No toLowerCase()
        }

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ error: 'An error occurred while fetching the form data.' });
            }

            // Respond with the fetched data
            res.status(200).json({ message: 'Forms retrieved successfully!', data: results });
        });
    } catch (error) {
        console.error('Error retrieving forms:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the forms.' });
    }
};

module.exports = { submitForm, getForms };
