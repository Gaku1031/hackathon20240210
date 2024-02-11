import { z } from 'zod'

export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  generation: z.number(),
  is_present: z.boolean(),
})

export const LoginFormSchema = z.object({
  email: z.string().min(1, { message: 'メールアドレスを入力してください' }),
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
})

export const RegisterFormSchema = z.object({
  name: z.string().min(1, { message: '名前を入力してください' }),
  email: z.string().min(1, { message: 'メールアドレスを入力してください' }),
  generation: z.number().min(1, { message: '期生を選択してください' }),
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
  password_confirmation: z.string().min(1, { message: '確認用パスワードを入力してください' }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "パスワードが一致しません",
  path: ["password_confirmation"],
})
