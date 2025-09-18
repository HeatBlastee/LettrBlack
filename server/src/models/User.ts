import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    course: { type: String },
    goals: [{ type: String }],
    interests: [{ type: String }],
    badges: [{ type: String }],
    points: { type: Number, default: 0 },
    groupsJoined: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    notesUploaded: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    quizzesAttempted: [{ type: Schema.Types.ObjectId, ref: 'QuizAttempt' }],
    flashcards: [{ type: Schema.Types.ObjectId, ref: 'FlashcardDeck' }],
    newsletters: [{ type: Schema.Types.ObjectId, ref: 'Newsletter' }]
  },
  { timestamps: true }
);

export const UserModel = model('User', userSchema);
