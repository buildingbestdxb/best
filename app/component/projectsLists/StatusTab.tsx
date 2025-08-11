'use client';

const tabs = ['All Projects', 'Ongoing', 'Completed'];

export default function StatusTab({
  selectedStatus,
  setSelectedStatus,
}: {
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
}) {
  return (
    <div className="md:flex space-x-4 md:space-x-8 mb-3 md:mb-0 ">
      {tabs.map((tab) => {
        const isActive =
          selectedStatus === tab || (tab === 'All Projects' && selectedStatus === '');
        return (
          <button
            key={tab}
            onClick={() => setSelectedStatus(tab === 'All Projects' ? '' : tab)}
            className={`pb-3 
              relative  text-[20px] font-medium
              transition-colors duration-500 ease-out
              ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
              after:content-[''] after:absolute after:left-0 after:bottom-0
              after:h-[2px] after:bg-white after:w-full
              after:transform after:scale-x-0 after:origin-left
              after:transition-transform after:duration-500 after:ease-out
              ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
