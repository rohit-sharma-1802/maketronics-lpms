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

// Create a new supplier
export const createNewSupplier = async (supplier) => {
    try {
        const { name, email, companyName, country, phone, address } = supplier;
        const emailJson = JSON.stringify(email);
        const phoneJson = JSON.stringify(phone);

        const result = await queryAsync(`
            INSERT INTO Supplier(name, email, companyName, phone, country, address)
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
        return { id: result.insertId, ...supplier };
    } catch (error) {
        throw error;
    }
};

// Get supplier by ID
export const getSupplierById = async (id) => {
    try {
        const rows = await queryAsync('SELECT * FROM Supplier WHERE id = ?', [id]);
        if (rows.length > 0) {
            rows[0].email = JSON.parse(rows[0].email);
            rows[0].phone = JSON.parse(rows[0].phone);
            return rows[0];
        }
        return null;
    } catch (error) {
        throw error;
    }
};

// Update supplier by ID
export const updateSupplierById = async (supplier) => {
    try {
        const { name, email, companyName, country, phone, address, id } = supplier;
        const emailJson = JSON.stringify(email);
        const phoneJson = JSON.stringify(phone);

        await queryAsync(`
            UPDATE Supplier SET
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
        return { message: "Supplier Updated Successfully!" };
    } catch (error) {
        throw error;
    }
};

// Delete supplier by ID
export const deleteSupplierById = async (id) => {
    try {
        await queryAsync(`DELETE FROM Supplier WHERE id = ?`, [id]);
        return { message: "Supplier Deleted Successfully!" };
    } catch (error) {
        throw error;
    }
};

// Get all suppliers paginated
export const getAllSupplierPaginated = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;

        const rows = await queryAsync(
            'SELECT * FROM Supplier LIMIT ? OFFSET ?',
            [limit, offset]
        );

        rows.forEach(supplier => {
            supplier.email = JSON.parse(supplier.email);
            supplier.phone = JSON.parse(supplier.phone);
        });

        return rows;
    } catch (error) {
        throw error;
    }
};

// Get supplier count
export const getSupplierCount = async () => {
    try {
        const rows = await queryAsync('SELECT COUNT(*) AS count FROM Supplier');
        return rows[0].count;
    } catch (error) {
        throw error;
    }
};
