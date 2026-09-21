export default function SchoolFormActions() {
    return (
        <div className="flex justify-end gap-2">
            <button
                type="button"
                className="rounded-md border border-slate-300 px-5 py-2 text-xs"
            >
                Cancel
            </button>

            <button
                type="submit"
                className="rounded-md bg-blue-600 px-5 py-2 text-xs text-white"
            >
                Save Changes
            </button>
        </div>
    );
}