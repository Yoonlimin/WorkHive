import mongoose, {Schema} from 'mongoose';

const employerSchema= new Schema({ 
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
       
    },
    password: { 
        type: String, 
        required: true 
    },
    companyName: { 
        type: String, 
        required: true 
    },

    companyDetails: { 
        type: String, 
        required: true
    },
    address: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String, 
        required: true 
    }
   },
  {timestamps: true}
);

const Employer = mongoose.models.Employer || mongoose.model('Employer', employerSchema);

export default Employer;