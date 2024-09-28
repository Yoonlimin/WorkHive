import mongoose, { Schema } from 'mongoose';

const ApplyJobSchema = new Schema(
  {
    jobPostId: {
      type: Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    appliedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Freelancer',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    resume: {
      type: String, // This should store the file URL or path
      required: true,
    },
    coverLetter: {
      type: String, // This should store the file URL or path
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const ApplyJob = mongoose.models.ApplyJob || mongoose.model('ApplyJob', ApplyJobSchema);
export default ApplyJob;
