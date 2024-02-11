import { z } from 'zod';
import { 
  User,
  LoginFormSchema,
  RegisterFormSchema,
} from '.';

export type User = z.infer<typeof User>;
export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
