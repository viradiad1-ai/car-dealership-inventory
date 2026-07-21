import pool from "../config/database";

export const createVehicle = async (
  make: string,
  model: string,
  category: string,
  price: number,
  quantity: number
) => {
  const result = await pool.query(
    `INSERT INTO vehicles(make, model, category, price, quantity)
     VALUES($1,$2,$3,$4,$5)
     RETURNING *`,
    [make, model, category, price, quantity]
  );

  return result.rows[0];
};

export const getAllVehicles = async () => {
  const result = await pool.query(
    "SELECT * FROM vehicles ORDER BY id"
  );

  return result.rows;
};
export const searchVehiclesByFilter = async (filters: any) => {
  let query = "SELECT * FROM vehicles WHERE 1=1";
  const values: any[] = [];

  if (filters.make) {
    values.push(filters.make);
    query += ` AND make = $${values.length}`;
  }

  if (filters.model) {
    values.push(filters.model);
    query += ` AND model = $${values.length}`;
  }

  if (filters.category) {
    values.push(filters.category);
    query += ` AND category = $${values.length}`;
  }

  if (filters.minPrice) {
    values.push(filters.minPrice);
    query += ` AND price >= $${values.length}`;
  }

  if (filters.maxPrice) {
    values.push(filters.maxPrice);
    query += ` AND price <= $${values.length}`;
  }

  const result = await pool.query(query, values);

  return result.rows;
};
export const updateVehicleById = async (
  id: number,
  make: string,
  model: string,
  category: string,
  price: number,
  quantity: number
) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET make=$1,
         model=$2,
         category=$3,
         price=$4,
         quantity=$5
     WHERE id=$6
     RETURNING *`,
    [make, model, category, price, quantity, id]
  );

  return result.rows[0];
};
export const deleteVehicleById = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM vehicles WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};
export const purchaseVehicleById = async (
  id: number,
  quantity: number
) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET quantity = quantity - $1
     WHERE id = $2
       AND quantity >= $1
     RETURNING *`,
    [quantity, id]
  );

  return result.rows[0];
};
export const restockVehicleById = async (
  id: number,
  quantity: number
) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET quantity = quantity + $1
     WHERE id = $2
     RETURNING *`,
    [quantity, id]
  );

  return result.rows[0];
};