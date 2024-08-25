export function HistoryCard({
    name,
    amount,
    date,
    number,
    type,
  }: {
    name: string;
    amount: number;
    date: string;
    number: string;
    type: "sent" | "received";
  }) {
    return (
      <div className="border p-6 bg-white rounded-xl mx-5 sm:mx-0 mt-8 md:mt-0">
        <div className="flex justify-between">
          <Avatar name={name} />
          {type === "sent" ? <div className="text-blue-500 font-semibold text-2xl">Sent</div> : <div className="text-green-400 font-semibold text-2xl">Received</div>}
        </div>
        <div>
          <div className="flex justify-between border-b border-slate-300 pb-2 mt-5">
            <div>Name</div>
            <div>{name}</div>
          </div>
          <div className="flex justify-between border-b border-slate-300 py-2">
            <div>Number</div>
            <div>{number}</div>
          </div>
          <div className="flex justify-between border-b border-slate-300 py-2">
            <div>{type === "sent" ? "Amount Sent" : "Amount Received"}</div>
            <div>{amount / 100} PKR</div>
          </div>
          <div className="flex justify-between border-b border-slate-300 py-2">
            <div>Date</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
    );
  }
  
  function Avatar({ name }: { name: string }) {
    return (
      <div className="bg-[#6a51a6] relative cursor-pointer inline-flex items-center justify-center overflow-hidden rounded-full h-10 w-10">
        <span className="text-lg text-white">
          {name ? name[0]?.toUpperCase() : "A"}
        </span>
      </div>
    );
  }
  