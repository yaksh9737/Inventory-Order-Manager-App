import AdminDashboard from "./AdminDashboard";
import DistibuterDashboard from "./DistibuterDashboard";

export default function Dashboard({ Auth }) {
    return <div>
        {
            Auth.role < 1 ? <AdminDashboard /> : <DistibuterDashboard />
        }
    </div>
}