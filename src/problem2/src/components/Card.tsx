export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-4 bg-white/5 rounded-lg ${className ?? ""}`}>
      {children}
    </div>
  );
};
