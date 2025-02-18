-- MySQL Database Schema for crud_database
-- Create the resources table
CREATE TABLE
    resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
    );

-- Insert mock data into resources
INSERT INTO
    resources (name, description)
VALUES
    ('Resource 1', 'Description for resource 1'),
    ('Resource 2', 'Another description'),
    ('Resource 3', 'Sample resource with test data');