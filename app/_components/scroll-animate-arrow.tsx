interface ScrollArrowProps {
  className?: string;
}

export const ScrollArrowToLeft = ({ className }: ScrollArrowProps) => {
  return (
    <div className={`absolute right-0 top-1/2 rotate-90 ${className}`}>
      <span className="block w-6 h-6 border-b-2 border-r-2 border-primary rotate-45 animate-animate-arrow -m-[10px]"></span>
      <span className="block w-6 h-6 border-b-2 border-r-2 border-primary rotate-45 animate-animate-arrow -m-[10px] -delay-delay1"></span>
      <span className="block w-6 h-6 border-b-2 border-r-2 border-primary rotate-45 animate-animate-arrow -m-[10px] -delay-delay2"></span>
    </div>
  );
};

export const ScrollArrowToRight = ({ className }: ScrollArrowProps) => {
  return (
    <div className={`absolute right-0 top-1/2 -rotate-90 ${className}`}>
      <span className="block w-6 h-6 border-b-2 border-r-2 border-primary rotate-45 animate-animate-arrow -m-[10px]"></span>
      <span className="block w-6 h-6 border-b-2 border-r-2 border-primary rotate-45 animate-animate-arrow -m-[10px] -delay-delay1"></span>
      <span className="block w-6 h-6 border-b-2 border-r-2 border-primary rotate-45 animate-animate-arrow -m-[10px] -delay-delay2"></span>
    </div>
  );
};
