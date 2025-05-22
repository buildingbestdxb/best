'use client';

import { Fragment } from 'react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';

const statusOptions = ['Status', 'Completed', 'Ongoing'];

export default function StatusDropdown({ selectedStatus, setSelectedStatus }: { selectedStatus: string, setSelectedStatus: (val: string) => void }) {
  return (
    <div className="w-full relative">
      <Listbox value={selectedStatus} onChange={setSelectedStatus}>
        <div className="relative">
          <Listbox.Button className="w-full bg-transparent text-white py-2 pr-10 pl-3 border-b border-white text-left focus:outline-none focus:border-gray-300 transition duration-300">
            <span className="block truncate">{selectedStatus || 'Status'}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronUpDownIcon className="w-5 h-5 text-white" />
            </span>
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-black border border-white text-white max-h-60 overflow-auto focus:outline-none">
              {statusOptions.map((status, idx) => (
                <Listbox.Option
                  key={idx}
                  value={status === 'Status' ? '' : status}
                  className={({ active }) =>
                    `cursor-pointer select-none py-2 px-4 ${active ? 'bg-gray-700' : ''}`
                  }
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {status}
                      {selected ? <CheckIcon className="w-4 h-4 inline ml-2" /> : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
