'use client';

import {
  AlertCircle,
  Download,
  Printer,
  RotateCcw,
  Upload,
} from 'lucide-react'; // Adicionado Upload
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ResumeDocument } from '@/components/ResumeDocument';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import { initialResumeState, type ResumeData } from '@/types';

export default function ATSBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Referência para o input de ficheiro oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => (
        <button
          type='button'
          className='bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2'
        >
          Carregando...
        </button>
      ),
    }
  );

  // --- EFEITOS ---
  useEffect(() => {
    const saved = localStorage.getItem('ats-resume-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setResumeData({ ...initialResumeState, ...parsed });
      } catch (e) {
        console.error('Erro ao carregar dados', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ats-resume-data', JSON.stringify(resumeData));
    }
  }, [resumeData, isLoaded]);

  // --- AÇÕES ---

  const handleReset = () => {
    if (confirm('Tem a certeza? Isto apagará todos os dados atuais.')) {
      setResumeData(initialResumeState);
      setErrors({});
      localStorage.removeItem('ats-resume-data');
    }
  };

  // Exportar JSON
  const handleExportJson = () => {
    const fileName = `resume-${resumeData.fullName.replace(/\s+/g, '_').toLowerCase() || 'backup'}.json`;
    const jsonString = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // NOVO: Importar JSON
  const handleImportClick = () => {
    // Simula o clique no input file invisível
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        // Validação básica para ver se parece um currículo nosso
        if (parsed && typeof parsed === 'object') {
          if (
            confirm(
              'Isto irá substituir os dados atuais pelos do ficheiro. Deseja continuar?'
            )
          ) {
            // Merge com initialResumeState garante que a estrutura esteja correta mesmo se o JSON for antigo
            setResumeData({ ...initialResumeState, ...parsed });
            setErrors({}); // Limpa erros antigos
          }
        } else {
          alert('O ficheiro selecionado não parece ser um backup válido.');
        }
      } catch (err) {
        console.error(err);
        alert(
          'Erro ao ler o ficheiro JSON. Verifique se o formato está correto.'
        );
      }
    };
    reader.readAsText(file);

    // Limpa o input para permitir carregar o mesmo ficheiro novamente se necessário
    event.target.value = '';
  };

  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <div className='animate-pulse flex flex-col items-center'>
          <div className='h-8 w-8 bg-slate-300 rounded-full mb-2'></div>
          <div className='text-slate-400 text-sm'>A carregar editor...</div>
        </div>
      </div>
    );
  }

  return (
    <main className='min-h-screen flex flex-col h-screen font-sans'>
      <nav className='bg-slate-900 text-white p-4 flex justify-between items-center print:hidden shadow-md z-10'>
        <div className='flex items-center gap-3'>
          <h1 className='font-bold text-xl tracking-tight hidden sm:block'>
            ATS Resume Builder
          </h1>
          <span className='text-xs bg-slate-700 px-2 py-1 rounded text-slate-300 hidden md:inline-block'>
            Auto-save
          </span>
        </div>

        <div className='flex gap-2 sm:gap-3 items-center'>
          {Object.keys(errors).length > 0 && (
            <span className='text-red-400 text-sm flex items-center gap-1 font-semibold animate-pulse mr-2'>
              <AlertCircle size={16} />{' '}
              <span className='hidden sm:inline'>Corrija os erros</span>
            </span>
          )}

          {/* Input File Invisível */}
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
            accept='.json'
          />

          {/* Botão Importar */}
          <button
            type='button'
            onClick={handleImportClick}
            className='text-slate-300 hover:text-white border border-slate-600 hover:border-slate-400 px-3 py-2 rounded flex items-center gap-2 transition-colors text-sm'
            title='Carregar backup (JSON)'
          >
            <Upload size={16} />
            <span className='hidden lg:inline'>Importar</span>
          </button>

          {/* Botão Exportar */}
          <button
            type='button'
            onClick={handleExportJson}
            className='text-slate-300 hover:text-white border border-slate-600 hover:border-slate-400 px-3 py-2 rounded flex items-center gap-2 transition-colors text-sm'
            title='Baixar backup (JSON)'
          >
            <Download size={16} />
            <span className='hidden lg:inline'>Exportar</span>
          </button>

          <button
            type='button'
            onClick={handleReset}
            className='text-slate-400 hover:text-white px-3 py-2 rounded flex items-center gap-2 transition-colors text-sm hover:bg-slate-800'
            title='Limpar tudo'
          >
            <RotateCcw size={16} />
            <span className='hidden lg:inline'>Limpar</span>
          </button>

          {isLoaded && (
            <PDFDownloadLink
              document={<ResumeDocument data={resumeData} />}
              fileName={`curriculo-${resumeData.fullName.replace(/\s+/g, '_').toLowerCase()}.pdf`}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-all shadow font-medium text-sm sm:text-base decoration-0 no-underline'
            >
              {/* O componente passa uma prop 'loading' para sabermos se está gerando */}
              {({ loading }) => (
                <>
                  <Printer size={18} />
                  {loading ? 'Gerando...' : 'Salvar PDF'}
                </>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </nav>

      <div className='flex-1 flex overflow-hidden relative'>
        <div className='w-full md:w-1/2 border-r border-gray-200 overflow-hidden bg-gray-50 print:hidden z-0'>
          <ResumeEditor
            data={resumeData}
            onChange={setResumeData}
            errors={errors}
          />
        </div>

        <div className='hidden md:block w-1/2 overflow-y-auto bg-gray-200 p-8 print:block print:w-full print:absolute print:top-0 print:left-0 print:p-0 print:m-0 print:bg-white print:z-50 print:h-auto print:overflow-visible'>
          <div className='mx-auto print:mx-0 print:w-full'>
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </main>
  );
}
