import fs from "fs/promises";
import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const server = express();

server.use(express.json());

///////////////////cRud -- Initial Render/////////////////////
server.get("/api/applications", (req, res, next) => {
  db.query("SELECT * FROM applications")
    .then((result) => {
      res.send(result.rows);
    })
    .catch(next);
});

/////////////////Crud -- Creating New Application Card///////////////////////
server.post("/api/applications", (req, res, next) => {
  const {
    company,
    position,
    submit_date,
    poc,
    poc_email,
    poc_phone,
    app_result,
  } = req.body;

  db.query(
    `
    INSERT INTO applications (company, position, submit_date, poc, poc_email, poc_phone, app_result)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `,
    [company, position, submit_date, poc, poc_email, poc_phone, app_result]
  )
    .then((result) => {
      if (result.rows.length === 0 || !result) {
        res.sendStatus(404);
        return;
      } else {
        res.status(201).send(result.rows[0]);
      }
    })
    .catch(next);
});

//////////////cruD -- Delete Card Application/////////////
server.delete("/api/applications/:id", (req, res, next) => {
  const application_id = Number(req.params.id);

  if (Number.isNaN(application_id)) {
    res.status(422);
    return;
  }

  db.query(`DELETE FROM applications WHERE id = $1 RETURNING *`, [
    application_id,
  ])
    .then((result) => {
      if (result.rows.length === 0 || !result) {
        res.sendStatus(404);
        return;
      } else {
        res.status(201).send(result.rows[0]);
      }
    })
    .catch(next);
});

// //////////////////crUd -- Update Application Card//////////////////
server.patch("/api/applications/:id", (req, res, next) => {
  const application_id = Number(req.params.id);
  const { company, position, poc, poc_email, poc_phone, app_result } = req.body;

  if (Number.isNaN(application_id)) {
    res.status(422).send("Invalid application ID");
    return;
  }

  db.query(
    `UPDATE applications
    SET company = COALESCE($1, company),
        position = COALESCE($2, position),
        poc = COALESCE($3, poc),
        poc_email = COALESCE($4, poc_email),
        poc_phone = COALESCE($5, poc_phone),
        app_result = COALESCE($6, app_result)
    WHERE id = $7 RETURNING *`,
    [company, position, poc, poc_email, poc_phone, app_result, application_id]
  )
    .then((result) => {
      if (!result.rows || result.rows.length === 0) {
        res.sendStatus(500);
        return;
      }
      res.status(201).send(result.rows[0]);
    })
    .catch(next);
});

//////////////Listening On Port/////////////////
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});
