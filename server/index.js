import fs from "fs/promises";
import express from "express";
import pg from "pg";
// import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const server = express();

server.use(express.json());

///////////////////cRud -- Initial Render/////////////////////
server.get("/api/applications", (req, res) => {
  db.query("SELECT * FROM applications").then((result) => {
    res.send(result.rows);
  });
});

/////////////////Crud -- Creating New Application Card///////////////////////
server.post("/api/applications", (req, res) => {
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

  db.query(
    `
    INSERT INTO applications (company, position, submit_date, response_date, poc, poc_email, poc_phone, status, application_group)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
  `,
    [
      company,
      position,
      submit_date,
      response_date,
      poc,
      poc_email,
      poc_phone,
      status,
      application_group,
    ]
  ).then((result) => {
    if (result.rows.length === 0 || !result) {
      res.sendStatus(404);
      return;
    } else {
      res.status(201).send(result.rows);
    }
  });
});

//////////////cruD -- Delete Card Application/////////////
server.delete("/api/applications/:id", (req, res) => {
  const application_id = Number(req.params.id);

  if (Number.isNaN(application_id)) {
    res.status(422);
    return;
  }

  db.query(`DELETE FROM applications WHERE id = $1 RETURNING *`, [
    application_id,
  ]).then((result) => {
    if (result.rows.length === 0 || !result) {
      res.sendStatus(404);
      return;
    } else {
      res.status(201).send(result.rows);
    }
  });
});

// //////////////////crUd -- Update Application Card//////////////////
server.patch("/api/applications/:id", (req, res) => {
  const application_id = Number(req.params.id);
  const {
    response_date,
    poc,
    poc_email,
    poc_phone,
    status,
    application_group,
  } = req.body;

  if (Number.isNaN(application_id)) {
    res.status(422);
    return;
  }

  db.query(
    `UPDATE applications
    SET response_date = COALESCE($1, response_date),
        poc = COALESCE($2, poc),
        poc_email = COALESCE($3, poc_email),
        poc_phone = COALESCE($4, poc_phone),
        status = COALESCE($5, status),
        application_group = COALESCE($6, application_group)
    WHERE id = $7 RETURNING *`,
    [
      response_date,
      poc,
      poc_email,
      poc_phone,
      status,
      application_group,
      application_id,
    ]
  )
    .then((result) => {
      if (!result.rows || result.rows.length === 0) {
        res.sendStatus(500);
        return;
      }
      res.status(201).send(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//////////////Listening On Port/////////////////
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
