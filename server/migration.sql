DROP TABLE IF EXISTS applications;

CREATE TABLE applications (
  id SERIAL NOT NULL,
  company TEXT,
  position TEXT,
  submit_date DATE,
  poc TEXT,
  poc_email TEXT,
  poc_phone TEXT,
  app_result TEXT
);

INSERT INTO applications(company, position, submit_date, poc, poc_email, poc_phone, app_result)
VALUES('Google', 'Software Engineer', '2023-06-09', 'Joe Smith', 'joeS@gmail.com', '555-123-456', 'Pending');

INSERT INTO applications(company, position, submit_date, poc, poc_email, poc_phone, app_result)
VALUES('Microsoft', 'Data Analyst', '2023-06-08', 'Jane Johnson', 'janeJ@gmail.com', '555-987-654', 'In Progress');

INSERT INTO applications(company, position, submit_date, poc, poc_email, poc_phone, app_result)
VALUES('Apple', 'UX Designer', '2023-06-05', 'Alex Anderson', 'alexA@gmail.com', '555-456-789', 'Rejected');

INSERT INTO applications(company, position, submit_date, poc, poc_email, poc_phone, app_result)
VALUES('Amazon', 'Product Manager', '2023-06-07', 'Sarah Sanders', 'sarahS@gmail.com', '555-789-123', 'Accepted');




