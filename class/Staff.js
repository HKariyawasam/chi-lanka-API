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
    },
    address: {
        type: String,
        required: true,
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
    },


})

const ProcumentStaffSchema = extendSchema(StaffSchema, {
    hours: {
        type: Number,
        required: true,
    },


})

const ManagementStaffSchema = extendSchema(StaffSchema, {
    bonus: {
        type: Number,
        required: true,
    },


})


const Staff = mongoose.model("Staff", StaffSchema);
const SiteManager = mongoose.model("SiteManager", SiteManagersSchema);
const ProcumentStaff = mongoose.model("ProcumentStaff", ProcumentStaffSchema);
const ManagementStaff = mongoose.model("ManagementStaff", ManagementStaffSchema);

module.exports = { Staff, SiteManager, ProcumentStaff, ManagementStaff };
