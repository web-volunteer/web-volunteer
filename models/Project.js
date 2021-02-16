const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  },
  status: {
      type: String,
      enum: ['open', 'running', 'closed'],
      default: 'open'
  },
  contributer: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
  ],
  time_per_week: {
    type: Number,
    min: 0,
    max: 40
  },
  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Developer'
    }
  ]
},
{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }  
  });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;