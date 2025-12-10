import { z } from 'zod';

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Nome da empresa é obrigatório'),
  role: z.string().min(1, 'Cargo é obrigatório'),
  startDate: z.string().min(1, 'Data de início necessária'),
  endDate: z.string().min(1, "Data de fim necessária (ou 'Atual')"),
  description: z
    .string()
    .min(10, 'Descreva suas atividades (mínimo 10 caracteres)'),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'Instituição é obrigatória'),
  degree: z.string().min(1, 'Grau/Curso é obrigatório'),
  startDate: z.string().min(1, 'Data de início necessária'),
  endDate: z.string().min(1, 'Data de fim necessária'),
});

export const resumeSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Telefone é obrigatório'), // Pode melhorar com regex se quiser
  linkedin: z
    .string()
    .url('URL do LinkedIn inválida')
    .optional()
    .or(z.literal('')),

  // O resumo é vital para o ATS entender o perfil rapidamente
  summary: z.string().min(50, 'Escreva um resumo de pelo menos 50 caracteres'),

  // As skills são as keywords. Não deixe o usuário enviar sem elas.
  skills: z.string().min(5, 'Liste pelo menos algumas habilidades/keywords'),

  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
});

// Tipo inferido pelo Zod (opcional, já que temos o types.ts, mas útil para sync)
export type ResumeSchemaType = z.infer<typeof resumeSchema>;
