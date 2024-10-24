import { createNewClient, getClientById, updateClientById, deleteClientById, getAllClientPaginated, getClientCount } from "./Client.model.js";

export const createClient = async(req, res)=>{
    try{
        const Client = await createNewClient(req.body);
        res.status(201).json({
            success: true,
            Client
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        });
    }
}

export const getClient = async(req, res)=>{
    try{
        const { id } = req.params;
        const ClientId = parseInt(id);
        const client = await getClientById(ClientId);
        res.status(201).json({
            success: true,
            client
        }); 
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        });
    }
}

export const updateClient = async(req, res)=>{
    try{
        const result = await updateClientById(req.body);
        res.status(200).json({
            success: true,
            ...result
        }); 
    } 
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        }); 
    }
}

export const deleteClient = async(req, res)=>{
    try{
        const { id } = req.params;
        const ClientId = parseInt(id);
        const result = await deleteClientById(ClientId);
        res.status(200).json({
            success: true,
            ...result
        }); 
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        }); 
    }
}


export const getAllClient = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        // Wait for both async functions to resolve
        const [clients, totalClient] = await Promise.all([
            getAllClientPaginated(page, limit),
            getClientCount()
        ]);

        const totalPages = Math.ceil(totalClient / limit);  // Calculate total pages

        res.status(200).json({
            success: true,
            clients, // Note: Renamed from Client to clients for clarity
            totalPages,
            currentPage: page,
            totalClient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};
