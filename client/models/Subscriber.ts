import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
    source: { type: String, default: 'website' },
  },
  { timestamps: true },
);

type Subscriber = InferSchemaType<typeof subscriberSchema>;
type SubscriberModel = Model<Subscriber>;

export default (mongoose.models.Subscriber as SubscriberModel | undefined) ??
  mongoose.model<Subscriber>('Subscriber', subscriberSchema);
