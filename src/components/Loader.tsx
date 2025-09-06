import Skeleton from "react-loading-skeleton";
import { CircleLoader } from "react-spinners";
import "react-loading-skeleton/dist/skeleton.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="text-center">
        <CircleLoader
          color="#FE3566"
          loading={true}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="mt-4 text-[#347433]">Loading...</p>
      </div>
    </div>
  );
}

export function UserTableSkeleton({ rows = 5 }) {
  return (
    <div className="border border-muted rounded-md">
      <table className="w-full text-center">
        <thead>
          <tr>
            {[
              "SL No.",
              "Name",
              "Email",
              "Role",
              "Phone",
              "Address",
              "Action",
            ].map((_header, idx) => (
              <th key={idx} className="p-2">
                <Skeleton height={20} width={80} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: 7 }).map((_, colIdx) => (
                <td key={colIdx} className="p-2">
                  <Skeleton height={20} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
