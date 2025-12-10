import {
  ArrowRight,
  Bot,
  FileCheck,
  LayoutTemplate,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-white flex flex-col'>
      {/* Navbar */}
      <nav className='max-w-7xl mx-auto w-full px-6 py-4 flex justify-between items-center'>
        <div className='flex items-center gap-2 font-bold text-xl text-slate-900'>
          <FileCheck className='text-blue-600' />
          <span>ATS Resume</span>
        </div>
        <div className='space-x-4'>
          {/* Link direto para o app */}
          <Link
            href='/ats'
            className='text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors'
          >
            Entrar no Editor
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className='flex-1'>
        <section className='px-6 py-20 text-center max-w-4xl mx-auto'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6'>
            <Bot size={16} />
            <span>Otimizado para Inteligência Artificial</span>
          </div>

          <h1 className='text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6'>
            Seu currículo,{' '}
            <span className='text-blue-600'>aprovado por robôs</span>.
          </h1>

          <p className='text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed'>
            Pare de ser rejeitado por sistemas automáticos. Crie um currículo
            limpo, semântico e otimizado para os algoritmos de recrutamento
            (ATS) em minutos.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/ats'
              className='inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200'
            >
              Criar Currículo Grátis <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className='bg-slate-50 py-20 px-6'>
          <div className='max-w-7xl mx-auto'>
            <h2 className='text-3xl font-bold text-center text-slate-900 mb-12'>
              Por que usar nosso gerador?
            </h2>

            <div className='grid md:grid-cols-3 gap-8'>
              {/* Feature 1 */}
              <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-100'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4'>
                  <LayoutTemplate size={24} />
                </div>
                <h3 className='text-xl font-bold text-slate-900 mb-2'>
                  Layout "Robo-Friendly"
                </h3>
                <p className='text-slate-600'>
                  Sem colunas duplas ou gráficos que confundem a leitura.
                  Estrutura linear que garante que sua experiência seja lida na
                  ordem certa.
                </p>
              </div>

              {/* Feature 2 */}
              <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-100'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4'>
                  <FileCheck size={24} />
                </div>
                <h3 className='text-xl font-bold text-slate-900 mb-2'>
                  Validação em Tempo Real
                </h3>
                <p className='text-slate-600'>
                  Nosso sistema avisa se você esquecer dados cruciais como
                  contato, palavras-chave ou datas, evitando descartes
                  automáticos.
                </p>
              </div>

              {/* Feature 3 */}
              <div className='bg-white p-8 rounded-xl shadow-sm border border-slate-100'>
                <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4'>
                  <Shield size={24} />
                </div>
                <h3 className='text-xl font-bold text-slate-900 mb-2'>
                  Privacidade Total
                </h3>
                <p className='text-slate-600'>
                  Seus dados não saem do seu navegador. Tudo é processado
                  localmente e salvo no seu dispositivo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='bg-slate-900 text-slate-400 py-8 text-center text-sm'>
        <p>
          &copy; {new Date().getFullYear()} ATS Resume Builder. Construído para
          carreiras.
        </p>
      </footer>
    </div>
  );
}
