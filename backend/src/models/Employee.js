const { default: mongoose } = require("mongoose");

const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        required:[true, 'ID is required'],
        trim: true
    },
    name: {
        type: String,
        required:[true, 'Name is required'],
        trim: true
    },
    department: {
        type: String,
        required:[true, 'Department is required'],
        trim: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema)