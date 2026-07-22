import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Total Products",
      value: "120",
      icon: <FaBoxOpen />,
      color: "#2563eb",
    },
    {
      title: "Total Orders",
      value: "58",
      icon: <FaShoppingCart />,
      color: "#16a34a",
    },
    {
      title: "Customers",
      value: "245",
      icon: <FaUsers />,
      color: "#9333ea",
    },
    {
      title: "Revenue",
      value: "£5,420",
      icon: <FaDollarSign />,
      color: "#ea580c",
    },
  ];

  const recentOrders = [
    {
      id: "#1001",
      customer: "John Smith",
      amount: "£39.99",
      status: "Pending",
    },
    {
      id: "#1002",
      customer: "Emma Wilson",
      amount: "£59.99",
      status: "Processing",
    },
    {
      id: "#1003",
      customer: "Olivia Brown",
      amount: "£24.99",
      status: "Delivered",
    },
    {
      id: "#1004",
      customer: "Sophia Davis",
      amount: "£74.99",
      status: "Shipped",
    },
  ];

  return (
    <div>
      <div className="dashboard-title">
        <h2>Admin Dashboard</h2>
        <p>Welcome back, Administrator</p>
      </div>

      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <div
              className="card-icon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <div className="card-info">
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Recent Orders</h3>
        </div>

        <div className="table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span
                      className={`status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;