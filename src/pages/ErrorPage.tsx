import { Button } from "@/components/ui/button";

import { AlertTriangle } from "lucide-react";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-4xl font-bold text-gray-800">Oops!</h1>
        <p className="mt-2 text-lg text-gray-600">
          Something went wrong! The page you are looking for doesn’t exist or an
          error occurred.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
