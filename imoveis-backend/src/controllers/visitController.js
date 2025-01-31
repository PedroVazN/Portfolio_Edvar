import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const scheduleVisit = async (req, res) => {
  const { propertyId, propertyTitle, date, time, email, phone, name } = req.body;

  try {
    // E-mail para o cliente confirmando o agendamento
    const customerEmail = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Confirmação de Agendamento de Visita',
      html: `
        <h2>Olá ${name},</h2>
        <p>Obrigado por agendar uma visita ao imóvel <strong>${propertyTitle}</strong>.</p>
        <p>O corretor <strong>Edvar</strong> entrará em contato com você pelo número <strong>(11) 94701-3673</strong>.</p>
        <p>Se precisar de algo antes da visita, entre em contato.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>Equipe Edvar Imóveis</p>
      `,
    };

    // E-mail para o corretor com os detalhes do cliente
    const agentEmail = {
      to: 'corretoredvar.com.br',
      from: process.env.EMAIL_USER,
      subject: `Novo Agendamento de Visita - ${propertyTitle}`,
      html: `
        <h2>Novo Agendamento de Visita</h2>
        <p><strong>Imóvel:</strong> ${propertyTitle}</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Horário:</strong> ${time}</p>
        <p><strong>Nome do Cliente:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <br>
        <p>Entre em contato com o cliente para confirmar a visita.</p>
      `,
    };

    // Enviar e-mails
    await sgMail.send(customerEmail);
    await sgMail.send(agentEmail);

    res.status(200).json({ message: 'E-mails enviados com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error);
    res.status(500).json({ message: 'Erro ao enviar a solicitação', error });
  }
};
