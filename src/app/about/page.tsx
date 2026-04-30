import Link from 'next/link'
import { serverEcommerceApi, serverNewsApi } from '@/lib/api-server'
import AboutPageClient, { AnimatedSection, AnimatedCard } from '@/components/about/AboutPageClient'
import { Cpu, Radio, ShieldCheck, Wrench, TrendingUp, Zap, Link2, Package } from 'lucide-react'
import { getCompany } from '@/lib/company'
import { unwrapEcommerceProductList } from '@/lib/ecommerce-list'
import PageHero from '@/components/hero/PageHero'
import ProductCard from '@/components/products/ProductCard'

export const dynamic = 'force-dynamic'

async function getAboutContent() {
  try {
    const articlesData = await serverNewsApi.articles.getBySlug('about')
    const articles = Array.isArray(articlesData) ? articlesData : (articlesData as any)?.results || []
    return articles[0] || null
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
}

async function getSampleProducts() {
  try {
    const products = await serverEcommerceApi.products.list({ is_active: true, featured: true, page_size: 4 })
    return unwrapEcommerceProductList(products).filter((p: any) => p.status !== 'archived').slice(0, 4)
  } catch {
    return []
  }
}

export default async function AboutPage() {
  const [aboutArticle, sampleProducts, company] = await Promise.all([
    getAboutContent(),
    getSampleProducts(),
    getCompany(),
  ])
  const companyName = company.name

  const sections = [
    { id: 'story', label: 'Our Story' },
    { id: 'investors', label: 'For Investors' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'believe', label: 'What We Believe' },
    ...(sampleProducts.length > 0 ? [{ id: 'examples', label: 'Our Collection' }] : []),
  ]

  return (
    <div className="min-h-screen tech-page-bg">
      <PageHero pageSlug="about" fallback={null} />

      {/* Hero */}
      <section className="py-16 md:py-20 brand-gradient-band">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-on-dark">
              Our Story
            </h1>
            <p className="text-xl text-on-dark-muted">
              ESP32 boards, sensors, gateways, and kits for connected projects.
            </p>
          </div>
        </div>
      </section>

      <AboutPageClient sections={sections}>
      {/* Our Story */}
      <AnimatedSection id="story" className="py-16">
        <div className="container-narrow">
          {aboutArticle ? (
            <div className="article-content" dangerouslySetInnerHTML={{ __html: aboutArticle.content }} />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-light leading-relaxed mb-6">
                {companyName} helps makers, classrooms, and small teams move from idea to connected
                prototype with carefully selected ESP32 boards, sensors, relays, gateways, and starter kits.
              </p>
              <p className="text-lg text-text-light leading-relaxed">
                We focus on practical compatibility: MicroPython-ready kits for learning, Wi-Fi and BLE
                modules for prototypes, and gateway hardware for smart-home and industrial edge builds.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* For Investors */}
      <AnimatedSection id="investors" className="py-16 paper-section">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair paper-title mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            For Investors
          </h2>
          <div className="space-y-6 paper-muted leading-relaxed">
            <p className="text-lg">
              {companyName} operates on a lean, technology-driven business model designed for scalability
              and predictable margins. We source products through established channels, apply consistent
              markup structures, and sell directly to consumers via our e-commerce platform.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="paper-surface rounded-xl p-6 border-l-4 border-primary">
                <h3 className="font-semibold paper-title mb-2">Sourcing & Curation</h3>
                <p className="paper-muted text-sm">
                  Products are identified from external listings. Our system ingests product data
                  automatically, allowing rapid catalog expansion with minimal manual effort.
                </p>
              </div>
              <div className="paper-surface rounded-xl p-6 border-l-4 border-secondary">
                <h3 className="font-semibold paper-title mb-2">Pricing & Margins</h3>
                <p className="paper-muted text-sm">
                  We apply category-specific markups to ensure healthy margins while remaining
                  competitive. Pricing is transparent and consistent across boards, kits, and accessories.
                </p>
              </div>
            </div>
            <p>
              The model reduces inventory risk, accelerates time-to-market, and creates a repeatable
              process that can scale with demand. Revenue flows from direct sales, with clear unit
              economics and low fixed overhead.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection id="how-it-works" className="py-16">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-primary" />
            How the Site Works
          </h2>
          <div className="space-y-6 text-text-light leading-relaxed">
            <p className="text-lg">
              Content is managed entirely by the site owner through an admin dashboard. When adding
              a new product, the owner provides a product URL from an external source.
            </p>
            <div className="paper-surface flex items-start gap-4 rounded-xl p-6">
              <div className="paper-icon-tile w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Link2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold paper-title mb-2">Automated Data Ingestion</h3>
                <p className="paper-muted text-sm">
                  The system automatically extracts product details—including name, description,
                  images, and pricing—from the provided URL. This data is then added to the catalog
                  with minimal manual input. The owner can review, adjust, and set final pricing
                  before publishing.
                </p>
              </div>
            </div>
            <p className="text-text-light">
              This workflow enables rapid catalog growth, consistent data quality, and efficient
              operations. Products go live quickly, and the store stays fresh with new arrivals
              without heavy data-entry overhead.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* What We Believe */}
      <AnimatedSection id="believe" className="py-16 paper-section" stagger>
        <div className="container-narrow">
          <h2 className="text-2xl font-bold font-playfair paper-title mt-12 mb-6">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <AnimatedCard className="paper-surface rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="paper-icon-tile w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-semibold paper-title mb-2">Practical Hardware</h3>
              <p className="paper-muted text-sm">
                Boards and modules are selected for useful I/O, clear documentation, and realistic project fit.
              </p>
            </AnimatedCard>
            <AnimatedCard className="paper-surface rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="paper-icon-tile w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="font-semibold paper-title mb-2">Clear Connectivity</h3>
              <p className="paper-muted text-sm">
                Wi-Fi, BLE, Ethernet, Matter, Thread, and Zigbee claims should be explicit and product-specific.
              </p>
            </AnimatedCard>
            <AnimatedCard className="paper-surface rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="paper-icon-tile w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold paper-title mb-2">Safe Builds</h3>
              <p className="paper-muted text-sm">
                Power, batteries, relays, and mains-voltage accessories need honest limits and plain warnings.
              </p>
            </AnimatedCard>
            <AnimatedCard className="paper-surface rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="paper-icon-tile w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-semibold paper-title mb-2">Builder Support</h3>
              <p className="paper-muted text-sm">
                Good kits include pinouts, firmware links, example projects, and a clear path to first boot.
              </p>
            </AnimatedCard>
          </div>
          <h2 className="text-2xl font-bold font-playfair paper-title mt-12 mb-6">Our Promise</h2>
          <p className="paper-muted leading-relaxed mb-6">
            When you shop with {companyName}, you&apos;re not just buying a product - you&apos;re
            choosing a path toward working connected hardware.
          </p>
          <p className="paper-muted leading-relaxed">
            Every item should be clearly described, packaged with care, and supported with enough context
            to help customers choose the right board, firmware path, and accessories.
          </p>
        </div>
      </AnimatedSection>

      {/* Product Examples */}
      {sampleProducts.length > 0 && (
        <AnimatedSection id="examples" className="py-16">
          <div className="container-wide">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-text mb-2 flex items-center gap-3">
              <Package className="w-8 h-8 text-primary" />
              From Our Collection
            </h2>
            <p className="text-text-muted mb-8 max-w-2xl">
              A sample of the boards, kits, and connected-device parts we curate for customers.
            </p>
            <div className="product-grid">
              {sampleProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/products" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA Section */}
      <section className="py-16 brand-gradient-band">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4 text-on-dark">
            Ready to Explore?
          </h2>
          <p className="text-lg text-on-dark-muted mb-8 max-w-2xl mx-auto">
            Discover ESP32 boards, MicroPython kits, sensors, smart-home modules, and gateway parts.
          </p>
          <Link href="/products" className="btn btn-gold text-lg px-8 py-3">
            Shop Now
          </Link>
        </div>
      </section>
      </AboutPageClient>
    </div>
  )
}
