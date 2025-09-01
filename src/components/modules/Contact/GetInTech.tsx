export default function GetInTech() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-primary drop-shadow">
        Get in Touch with Us
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        Whether you're a merchant, delivery partner, or customer – we’d love to
        hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Address */}
        <div className="bg-card shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            🏠 Our Office
          </h3>
          <p className="text-muted-foreground">
            123 Dhaka Street, Gulshan-1 <br /> Dhaka, Bangladesh
          </p>
        </div>

        {/* Phone */}
        <div className="bg-card shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            📞 Call Us
          </h3>
          <p className="text-muted-foreground">+880 1234-567890</p>
          <p className="text-muted-foreground">+880 9876-543210</p>
        </div>

        {/* Email */}
        <div className="bg-card shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            ✉️ Email
          </h3>
          <p className="text-muted-foreground">support@somoyxpress.com</p>
          <p className="text-muted-foreground">business@somoyxpress.com</p>
        </div>
      </div>
    </section>
  );
}
