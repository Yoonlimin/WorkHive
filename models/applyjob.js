import mongoose,{Schema} from 'mongoose';

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

const ApplyJob=mongoose.models.ApplyJob || mongoose.model('ApplyJob',ApplyJobSchema);
export default ApplyJob;