export class CreateAdminDto {
  username: string;
  email: string;
  captcha: string;
  password: string;
  role: string;
  record_time: Date;
}
