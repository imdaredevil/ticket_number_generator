const mongoose = require('mongoose');

const { Model, Schema } = mongoose;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
}

const TicketSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    project: {
        type: String,
        required: true, 
    }
},schemaOptions);

TicketSchema.index({ project: 1},{ unique: true});

class Ticket extends Model {

        constructor(projectName,number)
        {
            super();
            this.project = projectName;
            this.number = number;
        }
}

module.exports = mongoose.model(Ticket,TicketSchema, 'tickets');
