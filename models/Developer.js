const { Schema, model } = require("mongoose");

const developerSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  firstname: String,
  lastname: String,
  email: { 
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  location: String,
  languages: [{
    type: String
  }],
  stack: [{
    type: String
  }],
  time: {
    type: String,
    enum: ['<5hrs/week', '5-10hrs/week', '>10hrs/week']
  },
  experience: {
    type: String,
    enum: ['< 1 year', '1-5 years', '> 5 years']
  },
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  website: { 
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  github: { 
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  }
}, 
  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Developer = model("Developer", developerSchema);

module.exports = Developer;