import { ChevronDown, ChevronUp } from 'lucide-react'
import { getCompany } from '@/lib/company'

function buildFaqs(companyName: string) {
  return [
  {
    question: 'Are the kits beginner friendly?',
    answer: 'Many kits are selected for quick first builds with ESP32 boards, sensors, USB power, and MicroPython-friendly setup paths. Check each product description for included parts and skill level.'
  },
  {
    question: 'Do product pages include compatibility notes?',
    answer: 'Where available, listings call out Wi-Fi, BLE, pinout, voltage, firmware, and accessory compatibility. If a module has special power or wiring requirements, we aim to make that clear before checkout.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards through our secure Yoco payment gateway. This includes Visa, Mastercard, and American Express. All transactions are encrypted and secure.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping within South Africa takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. You\'ll receive a tracking number once your order ships.'
  },
  {
    question: 'Can I return an item?',
    answer: 'Yes. Return eligibility depends on item condition, packaging, and whether the part has been soldered, flashed, powered, or installed. Please see our Returns page for full details.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within South Africa. We\'re working on expanding our shipping options. Sign up for our newsletter to be notified when international shipping becomes available.'
  },
  {
    question: 'Can you help me choose parts for a project?',
    answer: 'Yes. Share your target build, power source, sensors, and connectivity needs, and we can help you narrow down suitable boards, modules, and accessories.'
  },
  {
    question: `Can ${companyName} source specific IoT hardware?`,
    answer: 'If you need a specific ESP32 board, sensor, relay, gateway, or accessory, contact us with the part details. We can review availability and get back to you.'
  },
  ]
}

export default async function FAQPage() {
  const company = await getCompany()
  const faqs = buildFaqs(company.name)
  return (
    <div className="min-h-screen tech-page-bg">
      {/* Header */}
      <section className="py-12 brand-gradient-band">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2 text-on-dark">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-on-dark-muted">
            Find answers about ESP32 kits, compatibility, delivery, and support.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container-narrow">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card group">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between">
                  <h3 className="font-semibold text-text pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0 group-open:hidden" />
                  <ChevronUp className="w-5 h-5 text-text-muted flex-shrink-0 hidden group-open:block" />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-text-light">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="paper-surface mt-12 text-center p-8 rounded-lg">
            <h2 className="text-xl font-semibold font-playfair paper-title mb-2">
              Still have questions?
            </h2>
            <p className="paper-muted mb-4">
              We&apos;re here to help! Reach out to our friendly team.
            </p>
            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
