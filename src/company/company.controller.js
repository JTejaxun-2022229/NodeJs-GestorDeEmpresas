import { response, request } from "express";
import Company from './company.model.js';
import excel from 'exceljs';

export const companyPost = async (req, res) => {
    const { name, email, address, phone, category, impactLevel, yearsExperiencie } = req.body;
    const company = new Company({ name, email, address, phone, category, impactLevel, yearsExperiencie });

    await company.save();

    res.status(200).json({
        company
    });
}

export const companyGet = async (req, res) => {
    const { limit, from, sortBy, sortOrder, searchKey, ...filters } = req.query;
    const query = { status: true };
    let sortQuery = {};
    let searchQuery = {};

    // Ordenamiento
    if (sortBy && sortOrder) {
        sortQuery[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    // Búsqueda específica
    if (searchKey) {
        searchQuery = { $or: [{ name: { $regex: new RegExp(searchKey, 'i') } }] };
    }

    // Filtros adicionales
    Object.keys(filters).forEach(key => {
        query[key] = { $regex: new RegExp(filters[key], 'i') };
    });

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments({ ...query, ...searchQuery }),
            Company.find({ ...query, ...searchQuery })
                .sort(sortQuery)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            total,
            companies
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const companyToExcel = async (req, res) => {
    try{
    const company = await Company.find({ status: true }).lean();

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Company');

    worksheet.columns = [
        { header: 'ID', key: '_id', width: 30},
        { header: 'NameCompany', key: 'name', width: 30},
        { header: 'Email', key: 'email', width: 30},
        { header: 'Address', key: 'address', width: 30},
        { header: 'Phone', key: 'phone', width: 30},
        { header: 'Impact level', key: 'impactLevel', width: 20},
        { header: 'Category', key: 'category', width: 20},
        { header: 'Years of experience', key: 'yearsExperiencie', width: 20},
        { header: 'Status', key: 'status', width: 20},
    ];

    company.forEach(company => {
        worksheet.addRow(company);
    });

    const stream = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Companies.xlsx"');

    res.send(stream);
    }catch(e){
        console.error('Error generating the Excel', error);
        res.status(500).json({ message: 'Error generating the Excel' });
    }
}