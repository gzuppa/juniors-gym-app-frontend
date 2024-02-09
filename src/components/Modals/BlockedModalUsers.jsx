import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { Box, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import useMembers from '../../hooks/useMembers'

const BlockedModalUsers = () => {
  const { allMembers, blockedUsersModal, handleBlockedUsersModal } =
    useMembers()

  const blockedUsers = allMembers.filter(element => {
    return element.status === 'Bloqueado'
  })

  return (
    <>
      <Transition appear show={blockedUsersModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={handleBlockedUsersModal}
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
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-white rounded-md text-purple-800 hover:text-purple-500 focus:outline-none"
                      onClick={!blockedUsersModal}
                    >
                      <span className="sr-only">Cerrar</span>
                      <CloseOutlinedIcon />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-purple-800"
                  >
                    Usuarios bloqueados 🚫
                  </Dialog.Title>
                  <div className="mt-2 mb-4">
                    <p className="text-sm text-gray-500">
                      Los siguientes usuarios se encuentran bloqueados ya que su
                      pago ha vencido
                    </p>
                  </div>
                  {blockedUsers.map(user => (
                    <Box
                      key={user._id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 38,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        🚫
                      </Box>
                      <Box
                        sx={{
                          ml: 2,
                          width: '100%',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            marginRight: 2,
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Typography
                            className="text-purple-800"
                            sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                          >
                            {user.name} {user.lastName}
                          </Typography>
                          <Typography variant="caption">
                            Nivel: {user.memberLevel}
                          </Typography>
                        </Box>
                        <Link to={`/admin/members/${user._id}`}>
                          <VisibilityOutlinedIcon />
                        </Link>
                      </Box>
                    </Box>
                  ))}
                  <Link
                    to="/admin/send-reminder"
                    className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 cursor-pointer font-raleway flex justify-center rounded-lg"
                  >
                    Enviar recordatorio
                  </Link>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default BlockedModalUsers
