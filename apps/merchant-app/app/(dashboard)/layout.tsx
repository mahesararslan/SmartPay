import { AppbarClient } from "../../components/AppbarClient";
import { SidebarItem } from "../../components/SidebarItem";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <AppbarClient />
    <div className="flex flex-col sm:flex-row">
        <div className="hidden md:block  sm:w-72 sm:border-r border-slate-300 sm:min-h-screen sm:mr-4 sm:pt-28">
            <div >
                <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
                <SidebarItem href={"/account"} icon={<AccountIcon />} title="Account" />                
            </div>
        </div>
            {children}
    </div>
    </div>
  );
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}

function AccountIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>

}