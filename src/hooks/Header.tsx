interface ITitle {
  title: string;
}

export default function Header({ title }: ITitle) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl text-center my-10  font-semibold">
        {title}
      </h1>
    </div>
  );
}
