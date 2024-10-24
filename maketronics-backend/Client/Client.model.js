import { pool } from "../config/database.js";

// Helper function to wrap the query in a Promise
const queryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Create a new client
export const createNewClient = async (client) => {
    try {
        const { name, email, companyName, country, phone, address } = client;
        const emailJson = JSON.stringify(email);
        const phoneJson = JSON.stringify(phone);

        const result = await queryAsync(`
            INSERT INTO Client(name, email, companyName, phone, country, address)
            VALUES(?, ?, ?, ?, ?, ?)`,
            [
                name,
                emailJson,
                companyName,
                phoneJson,
                country,
                address
            ]
        );
        return { id: result.insertId, ...client };
    } catch (error) {
        throw error;
    }
};

// Get client by ID
export const getClientById = async (id) => {
    try {
        const rows = await queryAsync('SELECT * FROM Client WHERE id = ?', [id]);
        if (rows.length > 0) {
            rows[0].email = JSON.parse(rows[0].email);
            rows[0].phone = JSON.parse(rows[0].phone);
            return rows[0];
        }
        return null; // Handle case when no client is found
    } catch (error) {
        throw error;
    }
};

// Update client by ID
export const updateClientById = async (client) => {
    try {
        const { name, email, companyName, country, phone, address, id } = client;
        const emailJson = JSON.stringify(email);
        const phoneJson = JSON.stringify(phone);

        await queryAsync(`
            UPDATE Client SET
                name = ?,
                email = ?,
                companyName = ?,
                phone = ?,
                country = ?,
                address = ?
            WHERE id = ?`,
            [
                name,
                emailJson,
                companyName,
                phoneJson,
                country,
                address,
                id
            ]
        );
        return { message: "Client Updated Successfully!" };
    } catch (error) {
        throw error;
    }
};

// Delete client by ID
export const deleteClientById = async (id) => {
    try {
        await queryAsync(`DELETE FROM Client WHERE id = ?`, [id]);
        return { message: "Client Deleted Successfully!" };
    } catch (error) {
        throw error;
    }
};

// Get all clients paginated
export const getAllClientPaginated = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;

        const rows = await queryAsync(
            'SELECT * FROM Client LIMIT ? OFFSET ?',
            [limit, offset]
        );

        rows.forEach(client => {
            client.email = JSON.parse(client.email);
            client.phone = JSON.parse(client.phone);
        });

        return rows;
    } catch (error) {
        throw error;
    }
};

// Get client count
export const getClientCount = async () => {
    try {
        const rows = await queryAsync('SELECT COUNT(*) AS count FROM Client');
        return rows[0].count;
    } catch (error) {
        throw error;
    }
};
