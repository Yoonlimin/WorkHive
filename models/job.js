import mongoose, { Schema } from "mongoose";

const jobPostSchema = new Schema(
  {  
    companyName: {
      type: String,
      required: true,
    },
    
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String], // Array to hold multiple skills
      required: true,
    },
    salaryPerMonth: {
      type: Number,
      required: true,
    },
    workDuration: {
      type: String, // e.g., '6 months', 'Full-time'
      required: true,
    },
    experienceLevel: {
      type: String, // e.g., 'Beginner', 'Intermediate', 'Expert'
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employer', // Assuming you have a User model defined
      required: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

const JobPost = mongoose.models.JobPost || mongoose.model('JobPost', jobPostSchema);

export default JobPost;