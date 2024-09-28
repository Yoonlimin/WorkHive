import mongoose, {Schema} from 'mongoose';

const freelancerSchema= new Schema({ 
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
    workType: {
        type: String,
        required: true
    }, 
    skills: { 
        type: [String], 
        required: true 
    },
    experienceLevel: { 
        type: String, 
        required: true 
    },
    professionalRole: {
        type: String,
        required: true,
      },

    languageProficiency: [
        {
          language: {
            type: String,
            required: true,
          },
          level: {
            type: String,
            required: true,
            enum: ['Basic', 'Conversational', 'Fluent', 'Native'], 
          },
        },
    ],

    salaryRate: {
        type: Number,
        required: true,
        },

    birthdate: {
        type: Date,
         required: true,
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

const Freelancer = mongoose.models.Freelancer || mongoose.model('Freelancer', freelancerSchema);

export default Freelancer;