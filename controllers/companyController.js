
const Company = require('../models/companyModel')

exports.createCompany = async (req, res) => {
    try{

    const { name, location, email, phone } = req.body;

    if (!name || !location || !email || !phone || !profile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingCompany = await Company.findOne({email})

    if (existingCompany) {
        return res.status(409).json({message: "email already in use"})
    }
    const updatedCompany = {
        name,
        location,
        email,
        phone,
        profile: `/uploads/${req.file.filename}`,
        
    };

    await Company.create(updatedCompany);

    return res.status(201).json({message: "registration successful"})
    
} catch (error){
    return res.status(409).json({message: "registration unsuccessfull", error: error.message})
}

}
exports.getAllCompanies = async (req, res) => {
    try{
        const companyData = await Company.find()

        if (companyData.length === 0) {
            return res.status(400).json({message: "data not found"})
        }
        return res.status(200).json({message: "companies fetched successfully", data:companyData})
    } catch (error) {
        return res.status(500).json({message: "fetching error", error: error.message})
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "id not found" })
        }
        const company = await Company.findById(id)
        if (!company) {
            return res.status(400).json({ message: "company not found" })
        }
        return res.status(200).json({ message: "company fetched successfully", data: company })
    } catch (error) {
        return res.status(500).json({ message: "fetching error", error: error.message })
    }


};

exports.updateCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "id not found" })
        }

        const company = await Company.findByIdAndUpdate(id, req.body, {new: true})

        if (!company) {
            return res.status(400).json({ message: "company not found" })
        }

        return res.status(200).json({ message: "company updated successfully"})

    } catch (error) {
        return res.status(500).json({ message: "fetching error", error: error.message })
    }


};


exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const deletedCompany = await Company.findByIdAndDelete(id);

        if (!deletedCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({
            message: "Company deleted successfully",data: deletedCompany
        });

    } catch (error) {
        return res.status(500).json({ message: "Delete error", error: error.message });
    }
};


// exports.getCompanies = (req, res) => {
//         res.status(200).json(companies);
//     };



// // In-memory store and ID tracker (defined right here)
// const companies = [];


// exports.createCompany = asynch(req, res) => {
//     const { id, name, location, email, phone, pin } = req.body;

//     if (!id || !name || !location || !email || !phone || !pin) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     const newCompany = {
//         id,
//         name,
//         location,
//         email,
//         phone,
//         pin,
        
//     };

//     companies.push(newCompany);
//     res.status(201).json({ message: "Company created", company: newCompany });
// };

// exports.getCompanies = (req, res) => {
//     res.status(200).json(companies);
// };

// exports.getCompanyById = (req, res) => {
    
//     const id = parseInt(req.query.id);
    

//     const company = companies.find(c => c.id === id);
//     if (!company) return res.status(404).json({ message: "Company not found" });

//     res.status(200).json(company);
// };

// exports.deleteCompany = (req, res) => {
//     const { id } = req.body;

//     const index = companies.findIndex(c => c.id === id);
    

//     companies.splice(index, 1);
//     res.status(200).json({ message: "Company deleted successfully" });
// };
