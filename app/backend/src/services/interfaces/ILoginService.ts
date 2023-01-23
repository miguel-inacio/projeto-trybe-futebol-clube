import { TUser } from './TUser';

export default interface ILoginService {
  userLogin(userLoginData: TUser): Promise<string | null>;
}
