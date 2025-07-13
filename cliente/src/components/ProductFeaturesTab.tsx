import { useState } from "react";
import { tabLabels } from "../constants/tabLabels";

const ProductFeaturesTab = (props) => {
  const tabsData = props.data;
  
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  if (!tabsData || tabsData.length === 0)
    return (
      <h2 className="flex items-center justify-center text-xl font-medium text-red-500">
        {" "}
        No hay información adicional del producto
      </h2>
    );

  return (
    <>
      <div className="overflow-scroll scroll-smooth bg-zinc-100">
        <div className="flex space-x-4 border-b">
          {/* Loop through tab data and render button for each. */}
          {tabsData.map((tab, idx) => {
            const Icon = tabLabels[idx].icon;
            return (
              <>
                {tab.content.length != 0 && (
                  <button
                    key={idx}
                    className={`flex flex-col md:flex-row gap-2 py-2 border-b-4 px-4
                       transition-colors duration-300 text-xs
                        ${
                          idx === activeTabIndex
                            ? "border-teal-500 bg-gray-200 rounded-md"
                            : "border-transparent hover:border-gray-200"
                        }`}
                    // Change the active tab on click.
                    onClick={() => setActiveTabIndex(idx)}
                  >
                    <Icon className={`"h-5 w-5" ${idx === activeTabIndex ? "text-red-600" : "text-gray-800"}`} /> {tab.label}
                  </button>
                )}
              </>
            );
          })}
        </div>
        {/* Show active tab content. */}

        <div className="py-3 px-4 h-72 overflow-scroll scroll-smooth">
          <ul className="space-y-2 py-3 text-sm">
            {tabsData[activeTabIndex].content.map((item, index) => (
              <li
                key={index}
                className="text-sm flex flex-col md:flex-row items-start gap-2 overflow-x-scroll"
              >
                <p>{item.nombre}</p> <span> </span>
                <p className="font-semibold"> {item.valor} </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductFeaturesTab;
