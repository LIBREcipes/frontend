export default class UserCreateDto {
  constructor(
    public username: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public language: string,
  ) {}

  static fromFromValue(form): UserCreateDto {
    return new UserCreateDto(
      form.username,
      form.first_name,
      form.last_name,
      form.email,
      form.password,
      form.language ?? 'en',
    )
  }
}
