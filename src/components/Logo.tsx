import { Recycle } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeMap = {
  sm: { icon: 32, text: "text-xl" },
  md: { icon: 48, text: "text-2xl" },
  lg: { icon: 80, text: "text-4xl" },
};

export function Logo({ size = "md", showText = true }: LogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-30 scale-125" />
        <div className="relative gradient-primary p-4 rounded-full shadow-button">
          <Recycle size={icon} className="text-primary-foreground" strokeWidth={2.5} />
        </div>
      </div>
      {showText && (
        <div className="text-center">
          <h1 className={`${text} font-bold text-foreground`}>
            Kabadi <span className="text-gradient">Man</span>
          </h1>
        </div>
      )}
    </div>
  );
}
