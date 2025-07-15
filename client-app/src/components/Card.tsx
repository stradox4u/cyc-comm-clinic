import clsx from "clsx";

type CardProps = {
  children?: React.ReactNode;
  text?: string;
  img?: string;
  bgColor?: string;
};

export default function Card({ text, bgColor, children }: CardProps) {
  return (
    <div
      className={clsx(
        bgColor,
        "p-5 rounded-md min-h-[200px] flex items-center justify-center"
      )}
    >
      <h2 className="text-2xl">{text}</h2>
      {children}
    </div>
  );
}
