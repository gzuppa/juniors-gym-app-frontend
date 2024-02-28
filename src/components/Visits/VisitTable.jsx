import { useState } from "react";
import {
  Box,
  Card,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import useMembers from "../../hooks/useMembers";

const VisitTable = () => {
  const { allVisits } = useMembers();
  const [rowPage, setRowPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newpage) => {
    setPage(newpage);
  };
  const handleChangeRowsPerPage = (event, newpage) => {
    setRowPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <Paper>
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 800 }}
            aria-label="table in dashboard"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <p className="font-raleway text-purple-800 font-bold">
                    Nombre
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-raleway text-purple-800 font-bold">
                    Fecha
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-raleway text-purple-800 font-bold">
                    Pago de visita
                  </p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allVisits
                .slice(page * rowPage, page * rowPage + rowPage)
                .map((visits) => (
                  <TableRow
                    hover
                    key={visits.name}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell
                      sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <p className="font-raleway">{visits.name}</p>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <p className="font-raleway">{visits.visitDate.split('T')}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-raleway">{visits.visitPay}</p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allVisits.length}
          rowsPerPage={rowPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Visitas por página"}
        />
      </Paper>
    </Card>
  );
};

export default VisitTable;
