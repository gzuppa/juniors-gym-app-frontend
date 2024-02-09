import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useMembers from '../hooks/useMembers'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Searching = () => {
  const [searching, setSearching] = useState('')
  const { searcher, handleSearching, members } = useMembers()
  const filteredMembers =
    searching === ''
      ? []
      : members.filter(member =>
          member.name.toLowerCase().includes(searching.toLowerCase()),
        )

  return (
    <Transition.Root
      show={searcher}
      as={Fragment}
      afterLeave={() => setSearching('')}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20"
        onClose={handleSearching}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={member =>
              (window.location = `/admin/members/${member._id}`)
            }
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Buscar..."
                onChange={e => setSearching(e.target.value)}
              />
            </div>

            {filteredMembers.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                {filteredMembers.map(member => (
                  <Combobox.Option
                    key={member._id}
                    value={member}
                    className={({ active }) =>
                      classNames(
                        'cursor-default select-none px-4 py-2',
                        active && 'bg-yellow-300 text-purple-800',
                      )
                    }
                  >
                    {member.name} {member.lastName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default Searching
