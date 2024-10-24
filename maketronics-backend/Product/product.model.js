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

// Create a new product
export const createNewProduct = async (product) => {
    try {
        const {
            partNo,
            productAttributes,
            additionalInfo,
            price,
            manufacturer,
            description,
            detailDescription,
            category,
            datasheetURL,
            status, 
            productInfo,
            photoUrl
        } = product;

        const result = await queryAsync(`
            INSERT INTO Product(partNo, productAttributes, additionalInfo, price, manufacturer, description, detailDescription, category, datasheetURL, status, productInfo, photoUrl)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                partNo,
                productAttributes,
                additionalInfo,
                price,
                manufacturer,
                description,
                detailDescription,
                category,
                datasheetURL,
                status,
                productInfo,
                photoUrl
            ]
        );
        return result;
    } catch (error) {
        throw error;
    }
};

// Delete a product by part number
export const deleteProductByPartNo = async (partNo) => {
    try {
        await queryAsync(`DELETE FROM Product WHERE partNo = ?`, [partNo]);
        return { message: "Product Deleted Successfully!" };
    } catch (error) {
        throw error;
    }
};

// Update a product by part number
export const updateProductByPartNo = async (product) => {
    try {
        const {
            partNo,
            productAttributes,
            additionalInfo,
            price,
            manufacturer,
            description,
            detailDescription,
            category,
            datasheetURL,
            status,
            productInfo,
            photoUrl
        } = product;

        await queryAsync(`
            UPDATE Product SET
                productAttributes = ?,
                additionalInfo = ?,
                price = ?,
                manufacturer = ?,
                description = ?,
                detailDescription = ?,
                category = ?,
                datasheetURL = ?,
                status = ?,
                productInfo = ?,
                photoUrl = ?
            WHERE partNo = ?`,
            [
                productAttributes,
                additionalInfo,
                price,
                manufacturer,
                description,
                detailDescription,
                category,
                datasheetURL,
                status,
                productInfo,
                photoUrl,
                partNo
            ]
        );
        return { message: "Product Updated Successfully!" };
    } catch (error) {
        throw error;
    }
};

// Get all products paginated
export const getAllProductPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;

    return queryAsync('SELECT * FROM product LIMIT ? OFFSET ?', [limit, offset]);
};

// Get product by part number
export const getProductById = async (partNo) => {
    try {
        const rows = await queryAsync('SELECT * FROM Product WHERE partNo = ?', [partNo]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Get product count
export const getProductCount = async () => {
    const results = await queryAsync('SELECT COUNT(*) AS count FROM Product');
    return results[0].count;
};
