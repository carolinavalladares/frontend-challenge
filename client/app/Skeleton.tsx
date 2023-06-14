interface IProps {
  className: string;
}
export default function Skeleton({ className }: IProps) {
  return <div className={`bg-gray-300 animate-pulse ${className}`}></div>;
}
