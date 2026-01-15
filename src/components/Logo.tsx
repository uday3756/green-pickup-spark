import kabadiLogo from "@/assets/kabadi-man-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeMap = {
  sm: { icon: 40, text: "text-xl" },
  md: { icon: 64, text: "text-2xl" },
  lg: { icon: 120, text: "text-4xl" },
};

export function Logo({ size = "md", showText = true }: LogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-125" />
        <img 
          src={kabadiLogo} 
          alt="Kabadi Man Logo" 
          width={icon} 
          height={icon}
          className="relative object-contain"
        />
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
