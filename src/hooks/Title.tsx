interface ITitle {
  title: string;
}

export default function Title({ title }: ITitle) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl text-center my-10  font-bold">
        {title}
      </h1>
    </div>
  );
}
