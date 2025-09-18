import "./../App.css";

interface Title {
  title: string;
}

export default function PageHeading({ title }: Title) {
  return (
    <div className="w-full header-container mt-12 text-2xl md:text-3xl lg:text-4xl font-semibold py-20">
      <h1>{title}</h1>
    </div>
  );
}
