export interface IAuthService {
  authenticate(params: any): Promise<string>
}