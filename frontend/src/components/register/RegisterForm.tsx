"use client";

import React, { useState } from 'react';

type Step = 1 | 2 | 3 | 4 | 5;

export default function RegisterForm() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    cpf: '',
    fullName: '',
    rg: '',
    gender: '',
    birthDate: { dia: '', mes: '', ano: '' },
    email: '',
    fixedPhone: '',
    cellPhone: '',
    smsCode: '',
  });

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-center text-primary">Criação de Cadastro</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="CPF ou CNPJ" 
                className="input-field"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              />
              <button onClick={nextStep} className="btn-primary w-full">
                Acessar
              </button>
              <div className="flex justify-center">
                <img src="https://i.ibb.co/v4zPzXN/ssl-badge.png" alt="SSL Secure" className="h-12 opacity-80" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary">Dados Pessoais</h2>
              <p className="text-sm text-muted-foreground">Etapa 2 de 4</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary uppercase">CPF</label>
                <input type="text" value={formData.cpf} disabled className="input-field bg-secondary/50" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary uppercase">Nome Completo</label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="Seu nome completo"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary uppercase">RG</label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="Número do RG"
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                  <label className="text-xs font-bold text-primary uppercase">Sexo</label>
                  <select 
                    className="input-field"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary uppercase">Data de Nascimento</label>
                <div className="grid grid-cols-3 gap-2">
                  <select className="input-field"><option>Dia</option></select>
                  <select className="input-field"><option>Mês</option></select>
                  <select className="input-field"><option>Ano</option></select>
                </div>
              </div>
              <button onClick={nextStep} className="btn-primary w-full">
                Enviar
              </button>
            </div>
          </div>
        );
      case 3:
        return (
           <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary">Informações de Contato</h2>
              <p className="text-sm text-muted-foreground">Etapa 3 de 4</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary uppercase">E-mail</label>
                <input type="email" placeholder="seu@email.com" className="input-field" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary uppercase">Telefone Fixo</label>
                <input type="text" placeholder="(11) 0000-0000" className="input-field" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary uppercase">Celular</label>
                <input type="text" placeholder="(11) 90000-0000" className="input-field" />
              </div>
              <button onClick={nextStep} className="btn-primary w-full">
                Enviar
              </button>
              <p className="text-[10px] text-center text-muted-foreground">
                Ao enviar, você permite que o Landrini entre em contato com você.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <h2 className="text-2xl font-bold text-primary">Validar Celular</h2>
            <div className="flex justify-center">
               <svg className="w-16 h-16 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
               </svg>
            </div>
            <p className="text-sm text-muted-foreground px-8">
              Para validar seu celular, insira o código que enviamos por SMS.
            </p>
            <div className="space-y-4">
              <input type="text" placeholder="Código SMS" className="input-field text-center text-xl tracking-widest" />
              <button onClick={() => alert('Cadastro finalizado (simulação)')} className="btn-primary w-full">
                Continuar
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 glass-panel rounded-2xl shadow-xl border-t-4 border-primary mt-12">
      {renderStep()}
    </div>
  );
}
