export default function ContactMap() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-foreground mb-10">
          Find Us on the Map
        </h2>
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14603.764273132483!2d90.40259926328062!3d23.785112793602185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s123%20Dhaka%20Street%2C%20Gulshan-1%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1756607500275!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
