import { memo } from "react";  

type SectionHeaderProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
};

export const SectionHeader = memo(({ Icon, title }:SectionHeaderProps) => {
  return (
    <>
      <div className="flex gap-4 mb-1">
        <Icon className="h-4 w-4 md:h-6 md:w-6 text-red-600" />
        <h2 className="text-sm md:text-3xl font-bold text-gray-900 mb-2 font-['Monserrat']">
          {title}
        </h2>
        <hr />
      </div>
    </>
  );
});
export default SectionHeader;
