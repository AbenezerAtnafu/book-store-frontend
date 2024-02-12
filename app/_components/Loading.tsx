export default function Loading() {
  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50">
      <div className="absolute left-1/2 top-1/2 z-50  -translate-x-1/2 -translate-y-1/2 items-center justify-center  h-6 w-6">
        <span className="loading loading-infinity loading-lg bg-white"></span>
      </div>
    </div>
  );
}
