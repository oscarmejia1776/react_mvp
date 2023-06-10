import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();

app.use(express.json());

///////////////////Initial Render/////////////////////
app.get("/api/applications", (req, res) => {
  sql`SELECT * FROM applications`.then((rows) => {
    res.send(rows);
  });
});

///////////////////Creating New Application Card///////////////////////
app.post("/api/applications", (req, res) => {
  const {
    company,
    position,
    submit_date,
    response_date,
    poc,
    poc_email,
    poc_phone,
    status,
    application_group,
  } = req.body;

  sql`
    INSERT INTO applications (company, position, submit_date, response_date, poc, poc_email, poc_phone, status, application_group)
    VALUES (${company}, ${position}, ${submit_date}, ${response_date}, ${poc}, ${poc_email}, ${poc_phone}, ${status}, ${application_group})
    RETURNING *
  `.then((result) => {
    console.log("Result:", result);
    if (!result || result.length === 0) {
      // changed from !result.rows to !result
      console.error("No rows returned from the insert operation");
      res.sendStatus(500);
      return;
    }
    res.status(201).send(result[0]); // changed from result.rows[0] to result[0]
  });
});

//////////////Listening On Port/////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
