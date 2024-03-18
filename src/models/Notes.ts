import { model, models, Schema } from "mongoose";

interface NoteSchemaInterface {
  note: String;
  desc: String;
  userId: String;
}

const NoteSchema = new Schema<NoteSchemaInterface>(
  {
    note: String,
    desc: String,
    userId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Note = models.Note || model("Note", NoteSchema);
export default Note;
