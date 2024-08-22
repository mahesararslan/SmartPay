
export function Avatar({ name}:{name:string}) {

    return <div className={"bg-[#6a51a6] relative cursor-pointer inline-flex items-center justify-center overflow-hidden  rounded-full h-52 w-52 sm:h-48 sm:w-48"}>
        <span className={"text-lg text-white"}>{name ? name[0]?.toUpperCase() :"A"}</span>
    </div>
    
}