import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthProvider } from "./context/AuthProvider";
import { MemberProvider } from "./context/MemberProvider";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import AdminWelcome from "./pages/AdminWelcome";
import ConfirmAccount from "./pages/ConfirmAccount";
import EditMember from "./pages/EditMember";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Member from "./pages/Member";
import Members from "./pages/Members";
import NewMember from "./pages/NewMember";
import NewPassword from "./pages/NewPassword";
import NewTrainer from "./pages/NewTrainer";
import Register from "./pages/Register";
import Warehouse from "./pages/Warehouse";
import WarehouseArticleDetail from "./pages/WarehouseArticleDetail";
import WarehouseArticleEdit from "./pages/WarehouseArticleEdit";
import WhatsappReminder from "./pages/WhatsappReminder";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <MemberProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route
                  path="forgot-password/:token"
                  element={<NewPassword />}
                />
                <Route path="confirm/:id" element={<ConfirmAccount />} />
              </Route>
              {/* TODO: Verificar rutas */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route index element={<AdminWelcome />} />
                <Route path="members" element={<Members />} />
                <Route path="create-member" element={<NewMember />} />
                <Route
                  path="members/new-trainer/:id"
                  element={<NewTrainer />}
                />
                <Route path="members/:id" element={<Member />} />
                <Route path="members/edit/:id" element={<EditMember />} />
                <Route path="warehouse" element={<Warehouse />} />
                <Route
                  path="warehouse/:id"
                  element={<WarehouseArticleDetail />}
                />
                <Route
                  path="warehouse/edit/:id"
                  element={<WarehouseArticleEdit />}
                />
                <Route path="send-reminder" element={<WhatsappReminder />} />
              </Route>
            </Routes>
          </MemberProvider>
        </AuthProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
