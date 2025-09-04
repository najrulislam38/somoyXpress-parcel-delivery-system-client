export default function WhyChooseUs() {
  return (
    <div className="container mx-auto py-10 lg:py-20 px-6">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        <div className="w-full md:w-1/2">
          <span className="text-primary font-medium  text-lg">
            Life at SomoyXpress
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold mb-8 mt-2 leading-snug">
            What SomoyXpress Offers
          </h1>
          <p className="text-muted-foreground mb-6">
            Founded in 2024, SomoyXpress is among the fastest growing tech
            startups in Asia which has dedicated itself to create solutions to
            minimize infrastructural problems.
          </p>
          <p className="text-muted-foreground">
            A fast paced organization, the company gives it employees an immense
            amount of space to grow professionally as well as take ownership of
            the initiatives undertaken in the organization.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <span className="text-primary font-medium text-lg">About Us</span>
          <h1 className="text-3xl md:text-4xl font-semibold  mb-8 mt-2 leading-snug">
            What SomoyXpress Does
          </h1>
          <p className="text-muted-foreground">
            With a hope to accelerate the establishment of digital Bangladesh,
            SomoyXpress provides an app based solution through ride sharing,
            Parcel delivery and e-commerce logistics services.
          </p>
          <p className="text-muted-foreground">
            By harnessing the power of technology, SomoyXpress aims to provide
            all services in one platform. We provide the best qualitiful
            services.
          </p>
        </div>
      </div>
    </div>
  );
}
