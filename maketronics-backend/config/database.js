import { createPool } from "mysql";
export const pool = createPool({
  port: 3306,
  host: "35.244.56.142",
  user: "maketronics",
  password: "Maketronics2024$",
  database: "maketronics",
  connectionLimit: 10,
});

