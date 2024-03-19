import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function LogoutButton() {
  const { push } = useRouter();
  const handleLogout = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    try {
      const response = await fetch("/api/logout");
      console.log(response);
      push("/login");
      toast.success("Logout has been successfull");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <button
      type="submit"
      className="bg-rose-700 text-white py-2 px-2 rounded-md fixed bottom-4 right-4 shadow-lg shadow-gray-600"
      onClick={handleLogout}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        />
      </svg>
    </button>
  );
}
