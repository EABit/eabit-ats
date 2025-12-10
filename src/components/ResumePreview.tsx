import type React from 'react';
import type { ResumeData } from '@/types';

interface Props {
  data: ResumeData;
  targetRef?: React.RefObject<HTMLDivElement>;
}

export default function ResumePreview({ data, targetRef }: Props) {
  return (
    <div className='w-full flex justify-center p-8 bg-gray-100 print:p-0 print:bg-white'>
      {/* Folha A4 simulada */}
      <div
        ref={targetRef}
        className='w-[210mm] min-h-[297mm] bg-white shadow-lg p-[20mm] text-black print:shadow-none print:w-full print:h-auto'
      >
        {/* Cabeçalho */}
        <header className='border-b-2 border-gray-800 pb-4 mb-6'>
          <h1 className='text-3xl font-bold uppercase tracking-wide mb-2'>
            {data.fullName || 'Seu Nome'}
          </h1>
          <div className='text-sm space-x-3 flex flex-wrap'>
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>| {data.phone}</span>}
            {data.linkedin && <span>| {data.linkedin}</span>}
          </div>
        </header>

        {/* Resumo Profissional */}
        {data.summary && (
          <section className='mb-6'>
            <h2 className='text-lg font-bold uppercase border-b border-gray-300 mb-3'>
              Resumo Profissional
            </h2>
            <p className='text-sm leading-relaxed text-justify'>
              {data.summary}
            </p>
          </section>
        )}

        {/* Experiência */}
        {data.experience.length > 0 && (
          <section className='mb-6'>
            <h2 className='text-lg font-bold uppercase border-b border-gray-300 mb-3'>
              Experiência Profissional
            </h2>
            <div className='space-y-4'>
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className='flex justify-between items-baseline mb-1'>
                    <h3 className='font-bold text-md'>{exp.role}</h3>
                    <span className='text-sm text-gray-600 whitespace-nowrap'>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className='text-sm font-semibold italic mb-1'>
                    {exp.company}
                  </div>
                  <p className='text-sm whitespace-pre-line leading-relaxed'>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educação */}
        {data.education.length > 0 && (
          <section className='mb-6'>
            <h2 className='text-lg font-bold uppercase border-b border-gray-300 mb-3'>
              Educação
            </h2>
            {data.education.map(edu => (
              <div key={edu.id} className='mb-2'>
                <div className='flex justify-between items-baseline'>
                  <h3 className='font-bold text-md'>{edu.school}</h3>
                  <span className='text-sm text-gray-600'>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className='text-sm'>{edu.degree}</div>
              </div>
            ))}
          </section>
        )}

        {/* Habilidades - Crucial para ATS (Keywords) */}
        {data.skills && (
          <section>
            <h2 className='text-lg font-bold uppercase border-b border-gray-300 mb-3'>
              Habilidades Técnicas
            </h2>
            <p className='text-sm'>{data.skills}</p>
          </section>
        )}
      </div>
    </div>
  );
}
