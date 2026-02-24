import OrderItems from "./OrderItems";

const OrderTable = ({ items = [] }) => (
  <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b">
          <th className="px-4 py-3 text-left">Food</th>
          <th className="px-4 py-3 text-right">Price</th>
          <th className="px-4 py-3 text-right">Quantity</th>
          <th className="px-4 py-3 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => <OrderItems key={item.id} item={item} />)
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              No items found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default OrderTable;