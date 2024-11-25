const ErrorBadge = ({ error }: { error: string }) => {
  return (
    <div className="rounded-md bg-red-100 p-2">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{error}</h3>
        </div>
      </div>
    </div>
  );
};

export default ErrorBadge;
