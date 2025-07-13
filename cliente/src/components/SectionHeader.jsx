import { memo } from "react";  

export const SectionHeader = memo(({ Icon, title }) => {
  return (
    <>
      <div className="flex gap-4 mb-2">
        <Icon className="h-4 w-4 md:h-6 md:w-6 text-red-600" />
        <h2 className="text-sm md:text-xl font-bold text-gray-900 mb-2 hover:underline ">
          {title}
        </h2>
      </div>
    </>
  );
});
