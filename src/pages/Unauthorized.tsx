import { Link } from "react-router";
import { Lock } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Lock className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="mt-4 text-4xl font-bold ">403</h1>
        <h2 className="mt-2 text-2xl font-semibold ">Unauthorized Access</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          You don’t have permission to view this page. Please login with the
          right credentials.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="rounded-2xl bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="rounded-2xl bg-gray-700 px-6 py-2 text-white shadow-md transition hover:bg-gray-800"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
