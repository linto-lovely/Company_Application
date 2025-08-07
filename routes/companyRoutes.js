const express = require('express');
const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
} = require('../controllers/companyController');
const upload  = require('../config/multer')
const router = express.Router();

router.post('/create-company', upload.single("profile"), createCompany);

router.get('/company-list', getAllCompanies);
router.get('/view-company/:id', getCompanyById);
router.put('/update-company/:id', updateCompany);
router.delete('/delete-company/:id', deleteCompany);

module.exports = router;
