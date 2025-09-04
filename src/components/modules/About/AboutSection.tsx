import team from "./../../../assets/images/team1.jpg";

export default function AboutSection() {
  return (
    <div className="container mx-auto my-10 lg:my-20 px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/5">
          <span className="text-primary font-medium text-lg">About Us</span>
          <h1 className="text-3xl md:text-4xl font-semibold mb-8 mt-3 leading-snug">
            Trusted by thousands of senders and receivers across Bangladesh.
            <br />
            We Provide The Best Quality Courier Services
          </h1>
          <p className="text-muted-foreground">
            SomoyXpress courier is a leading courier service company in
            Bangladesh dedicated to delivering reliable and efficient e-
            commerce logistics solutions in time. it is among the fastest
            growing tech startups in Asia which has dedicated itself to create
            solutions to minimize infrastructural problems.
          </p>
        </div>
        <div className="w-full lg:w-3/5">
          <img src={team} alt="team" className="rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
