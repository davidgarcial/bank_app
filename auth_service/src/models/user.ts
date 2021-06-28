export interface UserSchema {
  _id: { $oid: string };
  user: string;
  password: string;
}
