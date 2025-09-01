export default function Stay() {
  return (
    <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 transform ">
      <div className="min-w-4xl mx-auto grid grid-cols-3 gap-6 py-14 bg-white dark:bg-black shadow-sm shadow-accent-foreground rounded-2xl ">
        <div className="flex flex-col items-center space-y-3">
          <h2 className="text-4xl font-bold text-foreground">10K+</h2>
          <p className="text-sidebar-accent-foreground font-medium">
            Register Merchant
          </p>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <h2 className="text-4xl font-bold text-foreground">5K+</h2>
          <p className="text-sidebar-accent-foreground font-medium">
            Delivery Man
          </p>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <h2 className="text-4xl font-bold text-foreground">50K+</h2>
          <p className="text-sidebar-accent-foreground font-medium">
            Trips/Orders Served
          </p>
        </div>
      </div>
    </div>
  );
}
