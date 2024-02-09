import { Stack } from "@mui/material";
import WhatsappSend from "../config/WhatsappSend";
import useMembers from "../hooks/useMembers";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsappReminder = () => {
  const { allMembers } = useMembers();

  const blockedUsers = allMembers.filter((element) => {
    return element.status === "Bloqueado";
  });
  const payPendingUsers = allMembers.filter((element) => {
    return element.status === "Por pagar";
  });

  const DataBlock = (props) => {
    return (
      <div className="border-b p-5 flex flex-col md:flex-row justify-between">
        <Stack className="flex items-center gap-2" direction="row" spacing={1}>
          <div className="flex-1 md:flex">
            <div className="flex items-center">
              <SupervisedUserCircleOutlinedIcon className="mr-3 text-red-600" />
              <p className="text-purple-800">
                {props.name} {props.lastName}
              </p>
            </div>
            <div className="flex items-center lg:ml-8 ml-0">
              <CalendarMonthOutlinedIcon className="mr-3 text-orange-500" />
              <p className="text-purple-800">{props.payDate}</p>
            </div>
            <div className="flex items-center lg:ml-8 ml-0">
              <WhatsAppIcon className="mr-2 text-green-600" />
              <p className="text-purple-800">{props.phone}</p>
            </div>
          </div>
        </Stack>
        <WhatsappSend
          className="px-10 font-medium text-white py-2.5 bg-gradient-to-r whitespace-nowrap from-purple-950 to-purple-200 rounded-lg cursor-pointer mt-4 lg:mt-0"
          number={props.phone}
          message={props.message}
        >
          Enviar recordatorio
        </WhatsappSend>
      </div>
    );
  };

  return (
    <div className="font-raleway ">
      <h1 className="text-4xl text-yellow-300 font-bold">
        Envío de recordatorios
      </h1>
      <p className="text-lg text-yellow-300 mt-4">
        En esta sección se podrán enviar los recordatorios de pago para los
        usuarios que aún no lo han realizado o están por realizarlo
      </p>
      <p className="text-lg text-yellow-300 mt-4 mb-4 font-bold">
        Usuarios que superaron su fecha de pago ⛔
      </p>
      <section className="bg-white rounded-lg py-5 px-5 w-full">
        {blockedUsers.map((user) => (
          <DataBlock
            name={user.name}
            lastName={user.lastName}
            phone={user.phone}
            payDate={user.payDate.split("T")[0]}
            message={`Estimado usuario: ${user.name} ${user.lastName}, la fecha de pago de tu mensualidad venció el día ${user.payDate.split("T")[0]}. Por favor, realiza el pago correspondiente para continuar tus entrenamientos. Junior's Gym`}
          />
        ))}
      </section>

      <p className="text-lg text-yellow-300 mt-7 mb-4 font-bold">
        Usuarios que están próximos a superar su fecha de pago ⚠️
      </p>
      <section className="bg-white rounded-lg py-5 px-5 mt-8">
        {payPendingUsers.map((user) => (
          <DataBlock
            name={user.name}
            lastName={user.lastName}
            phone={user.phone}
            payDate={user.payDate.split("T")[0]}
            message={`Estimado usuario: ${user.name} ${user.lastName}, la fecha de vencimiento de tu mensualidad se acerca. Realiza tu pago antes del ${user.payDate.split("T")[0]} para continuar tus entrenamientos. Junior's Gym`}
          />
        ))}
      </section>
    </div>
  );
};

export default WhatsappReminder;
