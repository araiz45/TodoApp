import { model, models, Schema } from "mongoose";

interface UserSchemaInterface {
  name: String;
  password: String;
}

const UserSchema = new Schema<UserSchemaInterface>({
  name: String,
  password: String,
});

const User = models.User || model("User", UserSchema);
export default User;
