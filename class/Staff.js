const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 200
    },
    address: {
        type: String,
        required: true,
        maxlength: 300
    },
    designation: {
        type: String,
        required: true,
        enum: ['SiteManager', 'Procuement_Staff', 'Management', 'Intern'],
    },
    contactNumber: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10
    },
    salary: {
        type: Number,
        required: true,
        minlength: 5
    },
    joinedDate: {
        type: String,
        required: true
    }
})


const SiteManagersSchema = extendSchema(StaffSchema, {
    work_site_id: {
        type: Number,
        required: true,
        enum: ['S001', 'S002', 'S003', 'S004', 'S005'],
    },


})

const ProcumentStaffSchema = extendSchema(StaffSchema, {
    hours: {
        type: Number,
        required: true,
        minlength: 2
    },


})

const ManagementStaffSchema = extendSchema(StaffSchema, {
    bonus: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 5
    },


})


const Staff = mongoose.model("Staff", StaffSchema);
const SiteManager = mongoose.model("SiteManager", SiteManagersSchema);
const ProcumentStaff = mongoose.model("ProcumentStaff", ProcumentStaffSchema);
const ManagementStaff = mongoose.model("ManagementStaff", ManagementStaffSchema);

module.exports = { Staff, SiteManager, ProcumentStaff, ManagementStaff };
