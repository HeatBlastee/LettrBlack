import mongoose, { Document, Schema } from "mongoose";

export interface IGroup extends Document {
  name: string;
  description?: string;
  isPrivate: boolean;
  members: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        refer: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      refer: "User",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export const Group = mongoose.model<IGroup>("Group", groupSchema);
