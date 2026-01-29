import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const firstname = formData.get('firstname')?.toString() || '';
    const lastname = formData.get('lastname')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const subject = formData.get('subject')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    // Validation simple
    if (!firstname || !lastname || !email || !message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Veuillez remplir tous les champs obligatoires.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mapper le sujet
    const subjectLabels: Record<string, string> = {
      'rejoindre': 'Rejoindre Nzela Talents',
      'partenariat': 'Proposition de partenariat',
      'information': "Demande d'information",
      'autre': 'Autre',
      '': 'Contact général'
    };

    const subjectLabel = subjectLabels[subject] || 'Contact général';

    // Envoyer l'email
    const { error } = await resend.emails.send({
      from: 'Nzela Talents <noreply@nzelatalents.com>',
      to: ['contact@nzelatalents.com'],
      replyTo: email,
      subject: `[Contact] ${subjectLabel} - ${firstname} ${lastname}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>De :</strong> ${firstname} ${lastname}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subjectLabel}</p>
        <hr />
        <h3>Message :</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: "Une erreur s'est produite lors de l'envoi."
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Votre message a bien été envoyé !'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: "Une erreur s'est produite."
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
