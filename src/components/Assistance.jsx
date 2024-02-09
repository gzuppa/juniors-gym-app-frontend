import { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import TablePagination from '@mui/material/TablePagination'

const Assistance = ({ assistance }) => {
  const [rowPage, setRowPage] = useState(5)
  const [page, setPage] = useState(0)
  const handleChangePage = (event, newpage) => {
    setPage(newpage)
  }
  const handleChangeRowsPerPage = (event, newpage) => {
    setRowPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <TableContainer>
        <Table
          stickyHeader
          sx={{ minWidth: 800 }}
          aria-label="table in dashboard"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="font-raleway text-purple-800 font-bold">
                  Fecha de asistencia
                </p>
              </TableCell>
              <TableCell>
                <p className="font-raleway text-purple-800 font-bold">
                  Hora de asistencia
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assistance
              .slice(page * rowPage, page * rowPage + rowPage)
              .map(assistanceRegister => (
                <TableRow
                  hover
                  key={assistance}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <TableCell
                    sx={{ py: theme => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <p className="font-raleway">
                        {assistanceRegister
                          .split(',')[0]
                          .replace('/1', ' / Enero ')
                          // .replace('/2', ' / Febrero ')
                          .replace('/3', ' / Marzo ')
                          .replace('/4', ' / Abril ')
                          .replace('/5', ' / Mayo ')
                          .replace('/6', ' / Junio ')
                          .replace('/7', ' / Julio ')
                          .replace('/8', ' / Agosto ')
                          .replace('/9', ' / Septiembre ')
                          .replace('/10', ' / Octubre ')
                          .replace('/11', ' / Noviembre ')
                          .replace('/12', ' / Diciembre ')}
                      </p>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ py: theme => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <p className="font-raleway">
                        {assistanceRegister.split(',')[1]}
                      </p>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={assistance.length}
        rowsPerPage={rowPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'Registros por página'}
      />
    </>
  )
}

export default Assistance
