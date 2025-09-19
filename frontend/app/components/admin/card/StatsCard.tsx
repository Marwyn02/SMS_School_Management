import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

type TStatsProps = {
  title: string;
  stats: number;
  icon: LucideIcon;
  variant?: "black" | "blue" | "red" | "green" | "yellow";
};

const variantStyles: Record<
  NonNullable<TStatsProps["variant"]>,
  { bg: string; text: string }
> = {
  black: { bg: "bg-gray-100", text: "text-gray-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  red: { bg: "bg-red-100", text: "text-red-600" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
};

export default function StatsCard({
  title,
  stats,
  icon: Icon,
  variant = "black",
}: TStatsProps) {
  const { bg, text } = variantStyles[variant];

  return (
    <div className="flex items-center gap-3 border p-3 rounded-xl shadow-sm bg-white">
      <div className={clsx("p-2 rounded-lg", bg, text)}>
        <Icon size={24} />
      </div>

      <div>
        <p className="font-semibold">{title}</p>
        <p>{stats}</p>
      </div>
    </div>
  );
}
