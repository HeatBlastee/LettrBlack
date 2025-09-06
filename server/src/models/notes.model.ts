import mongoose, { Document, Schema, Types } from "mongoose";

export interface Notes extends Document {
  title: string;
  content: string;
  fileURL: string;
  subject: string;
  tags: string[];
  upvotedBy: Types.ObjectId[];
  ratings: {
    userId: Types.ObjectId;
    value: number;
  }[];
  createdBy: Types.ObjectId;
  groupId: Types.ObjectId;
}

const NoteSchema: Schema = new Schema<Notes>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  fileURL: {
    type: String, // We can first store the files in Cloudinary or Pinata Cloud For Enhanced Security and the retrived hash can be stored in database
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // it must refer to the User
    },
  ],
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // it must refer to the User
        required: true,
      },
      value: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // it must refer to the User
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group", // it must refer to the Group
    required: true,
  },
});

export default mongoose.model<Notes>("Notes", NoteSchema);
