export type TUser = {
  email: string,
  password: string
};

export default interface IUser extends TUser {
  username: string,
  role: string
}
