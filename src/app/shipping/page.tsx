import { Truck, Clock, Package, MapPin, CheckCircle } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="min-h-screen tech-page-bg">
      <section className="py-12 brand-gradient-band">
        <div className="container-wide">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2 text-on-dark">
            Shipping Information
          </h1>
          <p className="text-lg text-on-dark-muted">
            Courier Guy for imports, supplier delivery for local stock
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">Courier Guy (Imported + Gumtree)</h3>
              <p className="text-text-muted mb-4">Used for Temu, AliExpress, Ubuy and Gumtree products.</p>
              <ul className="text-sm text-text-light space-y-2">
                <li>Standard: from R90</li>
                <li>Express: from R130</li>
                <li>Pudo pickup: from R40</li>
                <li>Collect in-store: free</li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">Supplier Delivery (South African suppliers)</h3>
              <p className="text-text-muted mb-4">Used for local supplier groups such as Makro, Takealot, Game, etc.</p>
              <ul className="text-sm text-text-light space-y-2">
                <li>Flat supplier delivery charge applies per supplier group</li>
                <li>Free delivery unlocks when supplier threshold is met (commonly R500)</li>
                <li>Your cart shows exactly how much more to add for free delivery</li>
              </ul>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold font-playfair text-text flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              How delivery is calculated
            </h2>
            <p className="text-text-light">
              Orders can include multiple supplier groups. Delivery is calculated per supplier group:
              if you are below a supplier&apos;s free-delivery threshold, that supplier&apos;s flat delivery
              rate is added once; if you meet the threshold, delivery for that group is free.
            </p>

            <h2 className="text-2xl font-bold font-playfair text-text mt-8 flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Delivery times
            </h2>
            <p className="text-text-light">
              Imported products generally take 7-14 business days. South African supplier products
              are usually delivered in 2-5 business days. Exact timing varies by supplier and your location.
            </p>

            <h2 className="text-2xl font-bold font-playfair text-text mt-8 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Delivery areas
            </h2>
            <p className="text-text-light">
              We deliver nationwide across South Africa. Courier Guy coverage and supplier coverage
              can vary by area, but major cities and surrounding regions are supported.
            </p>

            <h2 className="text-2xl font-bold font-playfair text-text mt-8">Tracking</h2>
            <p className="text-text-light">
              Courier Guy shipments include tracking. Supplier-handled deliveries are tracked by
              the supplier where available.
            </p>
          </div>

          <div className="paper-surface mt-12 p-6 rounded-lg">
            <h3 className="font-semibold paper-title mb-2">Questions about shipping?</h3>
            <p className="paper-muted mb-4">
              Contact our team for assistance with delivery inquiries.
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
