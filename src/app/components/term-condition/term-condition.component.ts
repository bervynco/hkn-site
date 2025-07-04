import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-term-condition',
  imports: [CommonModule],
  templateUrl: './term-condition.component.html',
  styleUrl: './term-condition.component.css'
})
export class TermConditionComponent {
termsSections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        `By accessing or using the Hard Knock News app ("App"), you agree to be bound by these Terms and Conditions ("Terms").`,
        `If you do not agree, do not access or use the App.`
      ]
    },
    {
      title: '2. Service Description',
      content: [
        `Hard Knock News is a digital news platform that curates, aggregates, and distributes news content.`,
        `The App allows users to submit, publish, and engage with user-generated content.`
      ]
    },
    {
      title: '3. Eligibility',
      content: [
        `You must be at least 13 years old to use the App. Underage users need parental permission.`
      ]
    },
    {
      title: '4. User Accounts',
      content: [
        `Creating an account may be required. Users are responsible for maintaining their credentials.`
      ]
    },
    {
      title: '5. Subscriptions and Payments',
      content: [
        `Subscription plans offer premium features. Fees are billed in advance and non-refundable unless required by law.`
      ]
    },
    {
      title: '6. User-Generated Content',
      content: [
        `You may post or share content through the App. By doing so, you grant us a license to use it.`,
        `You’re responsible for your content and must not post anything unlawful or offensive.`
      ]
    },
    {
      title: '7. Intellectual Property',
      content: [
        `All App materials, excluding user content, are owned by Hard Knock News and protected by law.`
      ]
    },
    {
      title: '8. Prohibited Conduct',
      content: [
        `You agree not to violate laws, interfere with the App, impersonate others, or reverse-engineer the App.`
      ]
    },
    {
      title: '9. Privacy Policy',
      content: [
        `Use of your personal data is governed by our Privacy Policy.`
      ]
    },
    {
      title: '10. GDPR and CCPA Compliance',
      content: [
        `We comply with GDPR and CCPA. Contact privacy@hardknocknews.com for data-related requests.`
      ]
    },
    {
      title: '11. Community Guidelines',
      content: [
        `Respectful behavior is expected. Hate speech, threats, and misinformation are prohibited.`
      ]
    },
    {
      title: '12. Affiliate Partnerships and Advertising',
      content: [
        `The App may include ads or sponsored content. We may earn commissions but don’t endorse unless stated.`
      ]
    },
    {
      title: '13. Disclaimers',
      content: [
        `The App is provided “as-is.” We’re not liable for content accuracy or user-generated material.`
      ]
    },
    {
      title: '14. Limitation of Liability',
      content: [
        `We are not liable for indirect, incidental, or special damages.`
      ]
    },
    {
      title: '15. Arbitration Clause',
      content: [
        `Disputes are resolved by arbitration under the AAA. Users waive court rights.`
      ]
    },
    {
      title: '16. Termination',
      content: [
        `We may terminate access without notice if Terms are violated.`
      ]
    },
    {
      title: '17. Modifications to Terms',
      content: [
        `Terms may change. Continued use of the App means acceptance of changes.`
      ]
    },
    {
      title: '18. Governing Law',
      content: [
        `Terms are governed by the laws of the State of [Insert State].`
      ]
    },
    {
      title: '19. Contact Us',
      content: [
        `Email: contact@hardknocknews.com`,
        `Phone: [Insert Contact Number]`
      ]
    }
  ];
}
