type GreatAdminProps = {
    name: string;
    schoolName: string;
};

export default function GreatAdmin({ name, schoolName }: GreatAdminProps) {
    return (
        <div className="bg-blue-700 px-[27px] py-[40px] flex flex-col rounded-xl text-white">
            <p className="text-[45px] font-semibold">Welcome back, {name}</p>
            <p className="text-[20px]">
                Here’s an overview of your {schoolName} school system.
            </p>
        </div>
    );
}
