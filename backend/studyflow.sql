-- Create database
CREATE DATABASE IF NOT EXISTS studyflow;
USE studyflow;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    degree VARCHAR(50),
    branch VARCHAR(50),
    year VARCHAR(20),
    cgpa DECIMAL(3,2),
    hashed_password VARCHAR(255) NOT NULL
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    instructor VARCHAR(100),
    type VARCHAR(30),
    semester VARCHAR(20)
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    subject VARCHAR(100),
    total_periods INT,
    attended_periods INT,
    percentage FLOAT,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    subject VARCHAR(100),
    title VARCHAR(100),
    description TEXT,
    deadline DATE,
    submitted BOOLEAN DEFAULT 0,
    file_path VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    title VARCHAR(100),
    provider VARCHAR(100),
    duration VARCHAR(50),
    file_path VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Example bcrypt hash for password 'test123'
-- You can generate your own using Python if you wish
-- Example: $2b$12$KIXQJQwQpQ1QJQwQpQ1QJOQJQwQpQ1QJQwQpQ1QJQwQpQ1QJQwQpQ1

INSERT INTO users (roll_number, full_name, degree, branch, year, cgpa, hashed_password)
VALUES (
    'test@example.com',
    'Test User',
    'B.Tech',
    'CSE',
    '3rd Year',
    8.5,
    '$2b$12$eIFLQIS27/Av.aIODg6bpubgT4euKYuXCEeCipCMruJK/yL.0qiCu'
);

-- Example courses
INSERT INTO courses (title, instructor, type, semester) VALUES
('Data Structures & Algorithms', 'Prof. A. Sharma', 'Theory', '3'),
('Operating Systems', 'Prof. B. Kumar', 'Theory', '3'),
('DBMS', 'Prof. C. Singh', 'Lab-Oriented', '3'),
('Computer Networks', 'Prof. D. Rao', 'Theory', '3'),
('Software Engineering', 'Prof. E. Gupta', 'Theory', '3'),
('Python Lab', 'Prof. F. Mehta', 'Lab', '3');

-- Example enrollments
INSERT INTO enrollments (student_id, course_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);

-- Example attendance
INSERT INTO attendance (student_id, course_id, subject, total_periods, attended_periods, percentage) VALUES
(1, 1, 'Data Structures & Algorithms', 40, 36, 90.0),
(1, 2, 'Operating Systems', 38, 32, 84.2),
(1, 3, 'DBMS', 35, 30, 85.7),
(1, 4, 'Computer Networks', 40, 34, 85.0),
(1, 5, 'Software Engineering', 36, 31, 86.1),
(1, 6, 'Python Lab', 30, 28, 93.3);

-- Example assessments
INSERT INTO assessments (student_id, course_id, subject, title, description, deadline, submitted, file_path) VALUES
(1, 1, 'Data Structures & Algorithms', 'Assignment 1', 'Linked Lists', '2024-06-10', 0, NULL),
(1, 2, 'Operating Systems', 'Quiz 1', 'Processes and Threads', '2024-06-12', 0, NULL);

-- Example certificates
INSERT INTO certificates (student_id, title, provider, duration, file_path) VALUES
(1, 'Python Bootcamp', 'Coursera', '3 months', 'uploads/certificates/python_bootcamp.pdf'); 