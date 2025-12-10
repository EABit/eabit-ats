import { Plus, Trash2 } from 'lucide-react';
import type React from 'react';
import type { Education, Experience, ResumeData } from '@/types';

// Define a estrutura do objeto de erros vindo do Zod
interface ValidationErrors {
  [key: string]: string[] | undefined;
}

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  // A interrogação (?) torna opcional, o "= {}" na função garante que não quebre
  errors?: ValidationErrors;
}

export default function ResumeEditor({ data, onChange, errors = {} }: Props) {
  // Atualiza campos simples (Nome, Email, Resumo, Skills)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  // --- EXPERIÊNCIA ---
  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    const newExp = data.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: newExp });
  };

  const removeExperience = (id: string) => {
    const newExp = data.experience.filter(exp => exp.id !== id);
    onChange({ ...data, experience: newExp });
  };

  // --- EDUCAÇÃO ---
  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    const newEdu = data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: newEdu });
  };

  const removeEducation = (id: string) => {
    const newEdu = data.education.filter(edu => edu.id !== id);
    onChange({ ...data, education: newEdu });
  };

  // Helper para renderizar mensagem de erro
  const ErrorMsg = ({ field }: { field: string }) => {
    if (!errors[field]) return null;
    return (
      <span className='text-red-500 text-xs mt-1 block font-medium'>
        {errors[field]?.[0]}
      </span>
    );
  };

  // Helper para classe de erro no input
  const inputClass = (field: string) =>
    `w-full p-2 border rounded transition-colors focus:ring-2 focus:ring-blue-200 outline-none ${errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`;

  return (
    <div className='space-y-8 p-6 bg-white rounded-lg shadow-sm h-full overflow-y-auto'>
      {/* 1. DADOS PESSOAIS */}
      <section className='space-y-4'>
        <h3 className='font-semibold text-gray-700 uppercase text-sm tracking-wider'>
          Dados Pessoais
        </h3>

        <div>
          <label
            htmlFor='fullName'
            className='text-xs text-gray-500 mb-1 block'
          >
            Nome Completo
          </label>
          <input
            name='fullName'
            placeholder='Ex: João da Silva'
            value={data.fullName}
            onChange={handleChange}
            className={inputClass('fullName')}
          />
          <ErrorMsg field='fullName' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='email' className='text-xs text-gray-500 mb-1 block'>
              Email
            </label>
            <input
              name='email'
              placeholder='joao@exemplo.com'
              value={data.email}
              onChange={handleChange}
              className={inputClass('email')}
            />
            <ErrorMsg field='email' />
          </div>
          <div>
            <label htmlFor='phone' className='text-xs text-gray-500 mb-1 block'>
              Telefone
            </label>
            <input
              name='phone'
              placeholder='(11) 99999-9999'
              value={data.phone}
              onChange={handleChange}
              className={inputClass('phone')}
            />
            <ErrorMsg field='phone' />
          </div>
        </div>

        <div>
          <label
            htmlFor='linkedin'
            className='text-xs text-gray-500 mb-1 block'
          >
            LinkedIn (URL)
          </label>
          <input
            name='linkedin'
            placeholder='https://linkedin.com/in/...'
            value={data.linkedin}
            onChange={handleChange}
            className={inputClass('linkedin')}
          />
          <ErrorMsg field='linkedin' />
        </div>
      </section>

      {/* 2. RESUMO */}
      <section className='space-y-4'>
        <h3 className='font-semibold text-gray-700 uppercase text-sm tracking-wider'>
          Resumo Profissional
        </h3>
        <textarea
          name='summary'
          placeholder='Resuma sua carreira em 3-4 linhas...'
          value={data.summary}
          onChange={handleChange}
          rows={4}
          className={inputClass('summary')}
        />
        <ErrorMsg field='summary' />
      </section>

      {/* 3. EXPERIÊNCIA */}
      <section className='space-y-4'>
        <div className='flex justify-between items-center border-b pb-2'>
          <h3 className='font-semibold text-gray-700 uppercase text-sm tracking-wider'>
            Experiência Profissional
          </h3>
          <button
            type='button'
            onClick={addExperience}
            className='text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium transition-colors'
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>

        {data.experience.map((exp, index) => (
          <div
            key={exp.id}
            className='p-4 border rounded bg-gray-50 space-y-3 relative group hover:shadow-md transition-shadow'
          >
            <button
              type='button'
              onClick={() => removeExperience(exp.id)}
              className='absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors'
              title='Remover experiência'
            >
              <Trash2 size={16} />
            </button>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 pr-8'>
              <div>
                <input
                  placeholder='Cargo'
                  value={exp.role}
                  onChange={e =>
                    updateExperience(exp.id, 'role', e.target.value)
                  }
                  className={inputClass(`experience.${index}.role`)}
                />
                <ErrorMsg field={`experience.${index}.role`} />
              </div>
              <div>
                <input
                  placeholder='Empresa'
                  value={exp.company}
                  onChange={e =>
                    updateExperience(exp.id, 'company', e.target.value)
                  }
                  className={inputClass(`experience.${index}.company`)}
                />
                <ErrorMsg field={`experience.${index}.company`} />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <input
                  placeholder='Início (Ex: Jan 2020)'
                  value={exp.startDate}
                  onChange={e =>
                    updateExperience(exp.id, 'startDate', e.target.value)
                  }
                  className={inputClass(`experience.${index}.startDate`)}
                />
                <ErrorMsg field={`experience.${index}.startDate`} />
              </div>
              <div>
                <input
                  placeholder='Fim (Ex: Atual)'
                  value={exp.endDate}
                  onChange={e =>
                    updateExperience(exp.id, 'endDate', e.target.value)
                  }
                  className={inputClass(`experience.${index}.endDate`)}
                />
                <ErrorMsg field={`experience.${index}.endDate`} />
              </div>
            </div>

            <div>
              <textarea
                placeholder='Descrição das atividades (Use palavras-chave da vaga!)'
                value={exp.description}
                onChange={e =>
                  updateExperience(exp.id, 'description', e.target.value)
                }
                rows={3}
                className={inputClass(`experience.${index}.description`)}
              />
              <ErrorMsg field={`experience.${index}.description`} />
            </div>
          </div>
        ))}
      </section>

      {/* 4. EDUCAÇÃO */}
      <section className='space-y-4'>
        <div className='flex justify-between items-center border-b pb-2'>
          <h3 className='font-semibold text-gray-700 uppercase text-sm tracking-wider'>
            Formação Acadêmica
          </h3>
          <button
            type='button'
            onClick={addEducation}
            className='text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium transition-colors'
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>

        {/* Erro global do array (ex: se estiver vazio) */}
        <ErrorMsg field='education' />

        {data.education.map((edu, index) => (
          <div
            key={edu.id}
            className='p-4 border rounded bg-gray-50 space-y-3 relative group hover:shadow-md transition-shadow'
          >
            <button
              type='button'
              onClick={() => removeEducation(edu.id)}
              className='absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors'
            >
              <Trash2 size={16} />
            </button>

            <div className='pr-8'>
              <input
                placeholder='Instituição (Ex: USP, Udemy...)'
                value={edu.school}
                onChange={e =>
                  updateEducation(edu.id, 'school', e.target.value)
                }
                className={inputClass(`education.${index}.school`)}
              />
              <ErrorMsg field={`education.${index}.school`} />
            </div>

            <div>
              <input
                placeholder='Grau/Curso (Ex: Bacharel em Ciência da Computação)'
                value={edu.degree}
                onChange={e =>
                  updateEducation(edu.id, 'degree', e.target.value)
                }
                className={inputClass(`education.${index}.degree`)}
              />
              <ErrorMsg field={`education.${index}.degree`} />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <input
                  placeholder='Início'
                  value={edu.startDate}
                  onChange={e =>
                    updateEducation(edu.id, 'startDate', e.target.value)
                  }
                  className={inputClass(`education.${index}.startDate`)}
                />
                <ErrorMsg field={`education.${index}.startDate`} />
              </div>
              <div>
                <input
                  placeholder='Fim (ou Previsão)'
                  value={edu.endDate}
                  onChange={e =>
                    updateEducation(edu.id, 'endDate', e.target.value)
                  }
                  className={inputClass(`education.${index}.endDate`)}
                />
                <ErrorMsg field={`education.${index}.endDate`} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. SKILLS */}
      <section className='space-y-4'>
        <h3 className='font-semibold text-gray-700 uppercase text-sm tracking-wider'>
          Habilidades (Keywords)
        </h3>
        <div>
          <textarea
            name='skills'
            placeholder='React, Next.js, TypeScript, Tailwind, Node.js...'
            value={data.skills}
            onChange={handleChange}
            rows={3}
            className={inputClass('skills')}
          />
          <p className='text-xs text-gray-500 mt-1'>
            Separe por vírgulas. Essas são as keywords que o robô vai buscar.
          </p>
          <ErrorMsg field='skills' />
        </div>
      </section>
    </div>
  );
}
