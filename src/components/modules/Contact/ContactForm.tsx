export default function ContactForm() {
  return (
    <section className="bg-primary/5 py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-foreground mb-10">
          Send Us a Message
        </h2>
        <form className="bg-card p-8 rounded-2xl shadow-xl border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none"
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
