import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    service: {
      type: String,
      enum: ['Custom Software Development', 'Website / Web App Development', 'Native Android App', 'AI & Automation', 'Portal / Inventory Management', 'Multiple Services'],
      required: true,
    },
    budget: {
      type: String,
      enum: ['$2,500 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+', 'Not sure yet'],
      default: 'Not sure yet',
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'proposal-sent', 'closed-won', 'closed-lost'],
      default: 'new',
    },
    source: { type: String, enum: ['website', 'whatsapp', 'referral', 'other'], default: 'website' },
    notes: [{ text: String, addedBy: String, addedAt: { type: Date, default: Date.now } }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

type Inquiry = InferSchemaType<typeof inquirySchema>;
type InquiryModel = Model<Inquiry>;

export default (mongoose.models.Inquiry as InquiryModel | undefined) ??
  mongoose.model<Inquiry>('Inquiry', inquirySchema);
