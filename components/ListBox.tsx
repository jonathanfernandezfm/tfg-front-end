import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode, useState } from 'react';

interface ListBoxProps {
	selected: ItemListBox;
	items: ItemListBox[];
	setIconSelected: any;
	className?: string;
}
interface ItemListBox {
	id: string;
	value: string | ReactNode;
}

export const ListBox = ({ selected, items, setIconSelected, className }: ListBoxProps) => {
	return (
		<div>
			<Listbox value={selected} onChange={setIconSelected}>
				{({ open }) => (
					<div className="relative">
						<Listbox.Button
							className={`relative w-full py-2 pl-3 pr-3 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm ${className}`}
						>
							<span className="block truncate">{selected.value}</span>
						</Listbox.Button>
						<Transition
							show={open}
							appear={true}
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-50 grid grid-flow-col grid-rows-3 py-1 mt-1 text-base bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{items.map((item, itemIdx) => (
									<Listbox.Option
										key={itemIdx}
										className={({ active }) =>
											`${
												active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
											} cursor-default select-none relative py-2 pl-3 pr-3`
										}
										value={item}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`${
														selected ? 'font-medium' : 'font-normal'
													} block truncate`}
												>
													{item.value}
												</span>
												{selected ? (
													<span
														className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
													></span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				)}
			</Listbox>
		</div>
	);
};
