import React, { useState } from 'react';
import { Calendar, Clock, Mail, Phone as PhoneIcon, X } from 'lucide-react';

interface ScheduleVisitProps {
  propertyId: string;
  propertyTitle: string;
  onClose: () => void;
}

const ScheduleVisit: React.FC<ScheduleVisitProps> = ({ propertyId, propertyTitle, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://backendimoveis.vercel.app/api/schedule-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          propertyTitle,
          date: selectedDate,
          time: selectedTime,
          email,
          phone,
          agentEmail: 'edvar@corretoredvar.com.br',
          emailData: {
            clientEmail: {
              subject: 'Agendamento de Visita - Confirmação',
              text: `
                Olá!

                Agradecemos seu interesse em agendar uma visita ao imóvel: ${propertyTitle}.

                O Corretor Edvar entrará em contato com você através do número ${phone} para confirmar sua visita.

                Detalhes do agendamento:
                - Data: ${selectedDate}
                - Horário: ${selectedTime}

                Para sua conveniência, você pode entrar em contato diretamente com o corretor:
                Telefone: (11) 94701-3673

                Agradecemos a preferência!

                Atenciosamente,
                Equipe Corretor Edvar
              `
            },
            agentEmail: {
              subject: 'Nova Solicitação de Visita',
              text: `
                Nova solicitação de visita recebida!

                Detalhes do cliente:
                - Nome: ${email}
                - Telefone: ${phone}
                - Email: ${email}

                Detalhes da visita:
                - Imóvel: ${propertyTitle}
                - ID do imóvel: ${propertyId}
                - Data: ${selectedDate}
                - Horário: ${selectedTime}

                Por favor, entre em contato com o cliente para confirmar a visita.
              `
            }
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao agendar visita');
      }

      setMessage({
        type: 'success',
        text: 'Solicitação de visita enviada com sucesso! Em breve o corretor entrará em contato.'
      });
      
      // Reset form after successful submission
      setSelectedDate('');
      setSelectedTime('');
      setEmail('');
      setPhone('');
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro ao agendar visita. Por favor, tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agendar Visita</h2>
          <p className="text-gray-600 mb-6">Escolha a data e horário para visitar o imóvel</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data da Visita
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horário
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um horário</option>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-lg ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Clock className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Agendando...
                </span>
              ) : (
                'Agendar Visita'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisit;