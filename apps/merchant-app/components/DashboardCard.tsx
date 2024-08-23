
export function DashboardCard({children}: {children?: React.ReactNode}): JSX.Element {
  
    return (
        <div
          className="border bg-white p-6 rounded-xl mx-5 sm:mx-0"
        >
          <h1 className="font-semibold text-xl border-b pb-2">
            Balance
          </h1>
          <div>
            {children}
          </div>
        </div>
      );
}