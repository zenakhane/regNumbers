  
let assert = require("assert");
let reg2 = require("../reg");
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/reg_test';

const pool = new Pool({
    connectionString
});