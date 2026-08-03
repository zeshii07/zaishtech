import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    client: { type: String, required: true },
    description: { type: String, required: true },
    service: { type: String, required: true },
    techStack: [{ type: String }],
    status: { type: String, enum: ['planning', 'in-progress', 'review', 'delivered', 'maintenance'], default: 'planning' },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    startDate: { type: Date, default: Date.now },
    deadline: { type: Date },
    budget: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    image: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    inquiry: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquiry', default: null },
  },
  { timestamps: true },
);

type Project = InferSchemaType<typeof projectSchema>;
type ProjectModel = Model<Project>;

export default (mongoose.models.Project as ProjectModel | undefined) ??
  mongoose.model<Project>('Project', projectSchema);
