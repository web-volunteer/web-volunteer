const { Schema, model } = require("mongoose");

const ownerSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  email: { 
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  nameOrganisation: String,
  firstName: String,
  lastName: String,
  location: String,
  languages: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['NGO', 'Individual', 'Association', 'Educational institution', 'Startup', 'Company', 'Social Services', 'other']
  },
  description: String,
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }  
  });

const Owner = model("Owner", ownerSchema);

module.exports = Owner;