import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Chip, Stack } from "@mui/material";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

const MemberPreview = ({ member }) => {
  const { name, lastName, _id, memberLevel, status, payDate } = member;

  const addDaysToDate = () => {
    const date = new Date(payDate);
    date.setDate(date.getDate() + 30);
    const day = date.getDate();
    const month = date.getMonth();
    const futureMonth = month + 1;
    const year = date.getFullYear();
    const formattedDate = day + "/" + futureMonth + "/" + year;
    return formattedDate;
  };

  const chipStatusColor = useMemo(() => {
    switch (member.status) {
      case "Pagado":
        return "info";
      case "Por pagar":
        return "secondary";
      case "Bloqueado":
        return "error";
      default:
        return "secondary";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.status]);

  const chipLevelColor = useMemo(() => {
    switch (member.memberLevel) {
      case "Principiante":
        return "info";
      case "Intermedio":
        return "secondary";
      case "Avanzado":
        return "error";
      default:
        return "secondary";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.memberLevel]);

  const chipStatusIcon = useMemo(() => {
    switch (member.status) {
      case "Pagado":
        return <PriceCheckIcon />;
      case "Por pagar":
        return <MoneyOffIcon />;
      case "Bloqueado":
        return <DangerousIcon />;
      default:
        return <PriceCheckIcon />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.status]);

  const chipLevelIcon = useMemo(() => {
    switch (member.memberLevel) {
      case "Principiante":
        return <DirectionsBikeIcon />;
      case "Intermedio":
        return <FitnessCenterIcon />;
      case "Avanzado":
        return <EmojiEventsIcon />;
      default:
        return <PriceCheckIcon />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.memberLevel]);

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <Stack className="flex items-center gap-2" direction="row" spacing={1}>
        <div className="flex-1 md:flex">
          <p className="font-raleway text-purple-800">
            {name} {lastName}
          </p>
          <div className="mt-2 md:mt-0 mb-2 md:mb-0 md:ml-2 flex gap-3">
            <Chip
              label={memberLevel}
              size="small"
              color={chipLevelColor}
              icon={chipLevelIcon}
            />
            <Chip
              label={status}
              size="small"
              variant="outlined"
              color={chipStatusColor}
              icon={chipStatusIcon}
            />
            <Chip label={addDaysToDate()} size="small" variant="outlined" />
          </div>
        </div>
      </Stack>
      <Link
        to={`${_id}`}
        className="text-purple-800 hover:text-purple-600 uppercase cursor-pointer text-sm font-raleway font-bold"
      >
        Ver detalles
      </Link>
    </div>
  );
};

export default MemberPreview;
