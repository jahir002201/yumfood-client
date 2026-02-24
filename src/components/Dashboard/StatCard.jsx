const StatCard = ({ icon, title, value }) => {
  const Icon = icon;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className="bg-rose-100 p-3 rounded-lg">
          <Icon className="h-5 w-5 text-teal-600" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;