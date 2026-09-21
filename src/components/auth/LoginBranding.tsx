import Image from "next/image";

export default function LoginBranding() {
    return (
        <section className="relative flex flex-1 flex-col justify-between overflow-hidden p-8 lg:p-12">

            {/* Animated Background */}
            <div className="pointer-events-none absolute inset-0">
                
                {/* Blob 1 */}
                <div className="animate-float absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-400/40 blur-3xl" />

                <div className="animate-float absolute -right-0 -top-20 h-64 w-64 rounded-full bg-blue-400/40 blur-3xl" />

                <div className="animate-float absolute right-120 top-120 h-80 w-80 rounded-full bg-blue-400/40 blur-3xl" />

                <div className="animate-float absolute right-320 top-80 h-40 w-40 rounded-full bg-blue-400/40 blur-3xl" />


                {/* Blob 2 */}
                <div className="animate-float absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-700/30 blur-3xl" />

                <div className="animate-float absolute -bottom-0 -left-20 h-72 w-72 rounded-full bg-blue-700/30 blur-3xl" />


            </div>


            {/* Logo */}
            <div className="relative z-10 flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="Examify"
                    width={32}
                    height={32}
                />

                <span className="text-xl font-bold text-blue-700">
                    Examify
                </span>
            </div>


            {/* Welcome */}
            <div className="relative z-10 max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                    Selamat Datang di Examify
                </h1>

                <p className="mt-5 text-base leading-7 text-slate-600 lg:text-lg">
                    Platform ujian digital untuk masa depan pendidikan
                    yang lebih baik.
                </p>

                <p className="mt-2 text-base leading-7 text-slate-600 lg:text-lg">
                    Kami menyediakan lingkungan evaluasi yang aman, andal,
                    dan mudah digunakan untuk pendidik dan peserta didik.
                </p>
            </div>


            {/* Footer */}
            <p className="relative z-10 text-sm text-slate-500">
                Sistem Evaluasi Akademik Terpadu v2.4
            </p>

        </section>
    );
}