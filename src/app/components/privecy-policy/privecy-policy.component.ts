import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privecy-policy',
  imports: [CommonModule],
  templateUrl: './privecy-policy.component.html',
  styleUrl: './privecy-policy.component.css'
})
export class PrivecyPolicyComponent {
privacySections = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal Information: such as name, email address, phone number, and payment details.',
        'Usage Data: including device information, IP address, location data (if enabled), and browsing behavior.',
        'User-Generated Content: content you submit or post on the platform.'
      ]
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'To provide, maintain, and improve the App.',
        'To process subscriptions and payments.',
        'To send service-related updates and notifications.',
        'To personalize content and monitor usage for fraud prevention.'
      ]
    },
    {
      title: '3. Sharing of Information',
      content: [
        'We do not sell your personal data.',
        'We may share data with service providers, legal authorities, or affiliate partners (with non-personal data).'
      ]
    },
    {
      title: '4. Data Storage and Security',
      content: [
        'Your data is stored using industry-standard encryption. No method is 100% secure, but we take precautions.'
      ]
    },
    {
      title: '5. Your Rights',
      content: [
        'You may request access, correction, deletion, restriction, portability, or object to data use.',
        'To exercise rights, email: privacy@hardknocknews.com'
      ]
    },
    {
      title: '6. Cookies and Tracking',
      content: [
        'We use cookies and analytics tools. You can control them via your browser or device settings.'
      ]
    },
    {
      title: '7. Third-Party Services',
      content: [
        'The App may link to third-party services. Their privacy practices are separate from ours.'
      ]
    },
    {
      title: '8. Children’s Privacy',
      content: [
        'We do not knowingly collect personal data from children under 13. If found, we will delete it.'
      ]
    },
    {
      title: '9. International Data Transfers',
      content: [
        'Your data may be transferred and stored in countries like the U.S. where laws may differ.'
      ]
    },
    {
      title: '10. Changes to This Policy',
      content: [
        'We may update this policy. Continued use of the App implies acceptance of any changes.'
      ]
    },
    {
      title: '11. Contact Us',
      content: [
        'If you have questions, contact us at:',
        'Email: privacy@hardknocknews.com'
      ]
    }
  ];
}
