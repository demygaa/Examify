import { useEffect, useState } from 'react';

/** Wali kelas. */
export interface WaliKelas {
  nama: string;
  nip: string | null;
}

/** Bentuk data detail kelas dari API. Sesuaikan dengan response backend Anda. */
export interface Kelas {
  id: number | string;
  tingkat: string;          // Kelas, mis. "XI"
  jurusan: string;          // mis. "Rekayasa Perangkat Lunak"
  kode_jurusan: string;     // mis. "RPL"
  kode_kelas: string;       // mis. "XI-RPL-1"
  jumlah_siswa: number;
  wali_kelas: WaliKelas | null;
}

export type KelasId = number | string;

export interface ClassDetailDrawerProps {
  /** id kelas yang dipilih. null = drawer tertutup. */
  id: KelasId | null;
  /** Dipanggil saat drawer ditutup (X, overlay, atau Esc). */
  onClose: () => void;
  /** Sisi munculnya drawer. Default 'right'. */
  side?: 'left' | 'right';
  /** Membuat URL API dari id. Default: `/api/admin/kelas/${id}`. */
  endpoint?: (id: KelasId) => string;
  /** Tombol "Edit Kelas" hanya tampil bila diisi. */
  onEdit?: (kelas: Kelas) => void;
  /** Tombol "Hapus Kelas" hanya tampil bila diisi. */
  onDelete?: (kelas: Kelas) => void;
}

/** Hasil fetch disimpan bersama id-nya. */
interface FetchResult {
  id: KelasId | null;
  data: Kelas | null;
  error: string | null;
}

const defaultEndpoint = (kelasId: KelasId): string => `/api/admin/kelas/${kelasId}`;

/** Drawer "Detail Kelas" (gaya sama dengan Account Details). */
export default function ClassDetailDrawer({
  id,
  onClose,
  side = 'right',
  endpoint = defaultEndpoint,
  onEdit,
  onDelete,
}: ClassDetailDrawerProps) {
  const open = id !== null;

  // Simpan hasil bersama id-nya, supaya data kelas lama tidak sempat
  // tampil saat pindah ke kelas lain, dan isi tetap ada selama animasi tutup.
  const [result, setResult] = useState<FetchResult>({ id: null, data: null, error: null });
  const current: FetchResult | null = !open ? result : result.id === id ? result : null;
  const loading = open && current === null;
  const kelas = current?.data ?? null;
  const error = current?.error ?? null;

  // Ambil data setiap id berubah
  useEffect(() => {
    if (id === null) return;
    const kelasId: KelasId = id;
    const controller = new AbortController();

    async function ambilData(): Promise<void> {
      try {
        const res = await fetch(endpoint(kelasId), { signal: controller.signal });
        if (!res.ok) throw new Error('Gagal memuat detail kelas');
        const json = (await res.json()) as Kelas;   // catatan: ini hanya type, bukan validasi runtime
        setResult({ id: kelasId, data: json, error: null });
      } catch (err) {
        const e = err as Error;
        if (e.name === 'AbortError') return;
        setResult({ id: kelasId, data: null, error: e.message });
      }
    }

    void ambilData();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Esc untuk menutup + kunci scroll halaman saat terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const isRight = side === 'right';
  const posisi = isRight ? 'right-0 border-l' : 'left-0 border-r';
  const tersembunyi = isRight ? 'translate-x-full' : '-translate-x-full';

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-300
          ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Detail Kelas"
        aria-hidden={!open}
        className={`fixed top-0 ${posisi} z-50 flex h-full w-full max-w-[420px] flex-col
          border-slate-200 bg-slate-50 shadow-2xl
          transform transition-[transform,visibility] duration-300 ease-out
          ${open ? 'visible translate-x-0' : `invisible ${tersembunyi}`}`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Detail Kelas</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {/* Isi */}
        <div className="flex-1 overflow-y-auto">
          {loading && <Skeleton />}

          {error && (
            <p className="m-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          {kelas && (
            <div className="px-6 py-8">
              {/* Ringkasan */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                  {kelas.kode_jurusan || kelas.tingkat}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {kelas.tingkat} {kelas.kode_jurusan}
                </h3>
                <p className="text-sm text-slate-500">{kelas.jurusan}</p>
              </div>

              {/* Info utama */}
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-b border-slate-200 pb-6">
                <Info label="Kelas" value={kelas.tingkat} />
                <Info label="Kode Kelas" value={kelas.kode_kelas} />
                <Info label="Jurusan" value={kelas.jurusan} />
                <Info label="Jumlah Siswa" value={`${kelas.jumlah_siswa ?? 0} siswa`} />
              </dl>

              {/* Wali kelas */}
              <h4 className="mt-6 text-sm font-bold text-slate-900">Wali Kelas</h4>
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                {kelas.wali_kelas ? (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                      {inisial(kelas.wali_kelas.nama)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{kelas.wali_kelas.nama}</p>
                      <p className="truncate text-xs text-slate-500">NIP: {kelas.wali_kelas.nip || '-'}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-slate-500">Belum ada wali kelas</p>
                )}
              </div>

              {/* Aksi */}
              {(onEdit || onDelete) && (
                <div className="mt-8 space-y-3">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(kelas)}
                      className="w-full rounded-md border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Edit Kelas
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(kelas)}
                      className="w-full rounded-md bg-red-100 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-200"
                    >
                      Hapus Kelas
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value || '-'}</dd>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse px-6 py-8">
      <div className="mx-auto h-24 w-24 rounded-full bg-slate-200" />
      <div className="mx-auto mt-4 h-5 w-32 rounded bg-slate-200" />
      <div className="mx-auto mt-2 h-3 w-48 rounded bg-slate-200" />
      <div className="mt-8 grid grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-2.5 w-16 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-24 rounded bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="mt-8 h-16 rounded-lg bg-slate-200" />
    </div>
  );
}

function inisial(nama: string = ''): string {
  return nama
    .replace(/,.*$/, '')            // buang gelar setelah koma, mis. ", M.Kom"
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0].toUpperCase())
    .join('');
}