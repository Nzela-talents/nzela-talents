import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const subjectLabels: Record<string, string> = {
  rejoindre: 'Rejoindre Nzela Talents',
  partenariat: 'Proposition de partenariat',
  information: "Demande d'information",
  autre: 'Autre',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const firstname = formData.get('firstname')?.toString().trim() || '';
    const lastname = formData.get('lastname')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const subject = formData.get('subject')?.toString() || '';
    const message = formData.get('message')?.toString().trim() || '';

    // Validation
    if (!firstname || !lastname || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Veuillez remplir tous les champs obligatoires.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Veuillez entrer une adresse email valide.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const subjectLabel = subjectLabels[subject] || 'Contact';

    // Envoyer l'email
    const { error } = await resend.emails.send({
      from: 'Nzela Talents <onboarding@resend.dev>',
      to: [import.meta.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `[Nzela Talents] ${subjectLabel} - ${firstname} ${lastname}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
  <table width="600" cellspacing="0" cellpadding="0" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px;">

    <!-- Header -->
    <tr>
      <td style="background-color: #1e3a5f; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px;">Nzela Talents</h1>
      </td>
    </tr>

    <!-- Contenu -->
    <tr>
      <td style="padding: 30px;">
        <p style="margin: 0 0 20px; color: #1e3a5f; font-size: 18px; font-weight: bold;">
          Nouveau message : ${subjectLabel}
        </p>

        <p style="margin: 0 0 8px; color: #333;"><strong>De :</strong> ${firstname} ${lastname}</p>
        <p style="margin: 0 0 20px; color: #333;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #c45a3b;">${email}</a></p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

        <p style="margin: 0 0 10px; color: #1e3a5f; font-weight: bold;">Message :</p>
        <p style="margin: 0; color: #333; line-height: 1.6;">
          ${message.replace(/\n/g, '<br />')}
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8f8f8; padding: 16px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #eee;">
        <p style="margin: 0; color: #999; font-size: 12px;">
          Message envoyé depuis nzelatalents.com
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ success: false, error: "Erreur lors de l'envoi du message. Veuillez réessayer." }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Votre message a été envoyé avec succès !' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: "Une erreur inattendue s'est produite." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
