type HeaderAdminProps = {
    title: string
    sec: string
}
export default function HeaderAdmmin({
    title,
    sec
} : HeaderAdminProps) {
    return (
        <div className="text-black">
            <p className="font-semibold text-[20px]">{title}</p>
            <p className="text-slate-400 text-[15px]">{sec}</p>
        </div>
    );
}