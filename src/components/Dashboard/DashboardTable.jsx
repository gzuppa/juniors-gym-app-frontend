import { useState } from "react";
import { Link } from "react-router-dom";
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
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DangerousIcon from "@mui/icons-material/Dangerous";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import useMembers from "../../hooks/useMembers";

const DashboardTable = () => {
  const { allMembers } = useMembers();
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
                    Apellido
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-raleway text-purple-800 font-bold">
                    Nivel
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-raleway text-purple-800 font-bold">
                    Status
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-raleway text-purple-800 font-bold">Edad</p>
                </TableCell>
                <TableCell>
                  <p className="font-raleway text-purple-800 font-bold">
                    Teléfono
                  </p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allMembers
                .slice(page * rowPage, page * rowPage + rowPage)
                .map((members) => (
                  <TableRow
                    hover
                    key={members.name}
                    sx={{
                      "&:last-of-type td, &:last-of-type th": { border: 0 },
                    }}
                  >
                    <TableCell
                      sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <p className="font-raleway">{members.name}</p>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <p className="font-raleway">{members.lastName}</p>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={members.memberLevel}
                        size="small"
                        color={
                          members.memberLevel === "Principiante"
                            ? "info"
                            : members.memberLevel === "Intermedio"
                              ? "secondary"
                              : members.memberLevel === "Avanzado"
                                ? "error"
                                : "success"
                        }
                        icon={
                          members.memberLevel === "Principiante" ? (
                            <DirectionsBikeIcon />
                          ) : members.memberLevel === "Intermedio" ? (
                            <FitnessCenterIcon />
                          ) : members.memberLevel === "Avanzado" ? (
                            <EmojiEventsIcon />
                          ) : (
                            <PriceCheckIcon />
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={members.status}
                        size="small"
                        color={
                          members.status === "Pagado"
                            ? "info"
                            : members.status === "Por pagar"
                              ? "secondary"
                              : members.status === "Bloqueado"
                                ? "error"
                                : members.status === "Pagado (transferencia)"
                                  ? "warning"
                                : "success"
                        }
                        icon={
                          members.status === "Pagado" ? (
                            <PriceCheckIcon />
                          ) : members.status === "Por pagar" ? (
                            <MoneyOffIcon />
                          ) : members.status === "Bloqueado" ? (
                            <DangerousIcon />
                          ) : members.status === "Pagado (transferencia)" ? (
                            <CreditCardIcon />
                          ) : (
                            <PriceCheckIcon />
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-raleway">{members.age}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-raleway">{members.phone}</p>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/members/${members._id}`}>
                        <VisibilityOutlinedIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allMembers.length}
          rowsPerPage={rowPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Usuarios por página"}
        />
      </Paper>
    </Card>
  );
};

export default DashboardTable;
