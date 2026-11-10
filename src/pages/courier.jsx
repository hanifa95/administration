
import { useEffect, useState } from "react";
import axios from "axios";

const Courier = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://6a2fc982a7f8866418d5125a.mockapi.io/orders"
      );

      if (response.status === 200) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Удаление заказа
  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(
        `https://6a2fc982a7f8866418d5125a.mockapi.io/orders/${id}`
      );

      if (response.status === 200) {
        fetchOrders();
        alert("Заказ удален");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Изменение статуса
  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://6a2fc982a7f8866418d5125a.mockapi.io/orders/${id}`,
        {
          status,
        }
      );

      if (response.status === 200) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Цвет и название статуса
  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return {
          text: "🆕 Новый",
          bg: "#FCE8EB",
          color: "#DC3545",
        };

      case "processing":
        return {
          text: "🟡 В обработке",
          bg: "#FFF4D6",
          color: "#B7791F",
        };

      case "delivery":
        return {
          text: "🚚 Доставляется",
          bg: "#E5EEFF",
          color: "#2563EB",
        };

      case "completed":
        return {
          text: "✅ Доставлено",
          bg: "#E2F5EA",
          color: "#198754",
        };

      case "cancelled":
        return {
          text: "❌ Отменён",
          bg: "#E9EEF4",
          color: "#64748B",
        };

      default:
        return {
          text: "🆕 Новый",
          bg: "#FCE8EB",
          color: "#DC3545",
        };
    }
  };

  const statuses = [
    {
      value: "new",
      label: "🆕 Новый",
    },
    {
      value: "processing",
      label: "🟡 В обработке",
    },
    {
      value: "delivery",
      label: "🚚 Доставляется",
    },
    {
      value: "completed",
      label: "✅ Доставлено",
    },
    {
      value: "cancelled",
      label: "❌ Отменён",
    },
  ];

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "#F1F5FB" }}
    >
      <div className="container">

        {/* HEADER */}
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4 mb-5 rounded-4 shadow"
          style={{
            background: "linear-gradient(120deg, #0B1F3A, #174477)",
            color: "white",
          }}
        >
          <div>
            <h2 className="fw-bold mb-2">
              <i className="fa-solid fa-boxes-stacked text-info me-3"></i>
              Список заказов
            </h2>

            <p className="text-info mb-0">
              Управление заказами и доставкой
            </p>
          </div>

          <a
            href="/courierList"
            className="btn btn-light rounded-pill px-4 fw-bold"
            style={{ color: "#0B1F3A" }}
          >
            <i className="fa-solid fa-users me-2"></i>
            Courier List
          </a>
        </div>

        {/* STATISTICS */}
        <div className="row g-3 mb-5">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-1">
                    Всего заказов
                  </p>

                  <h2
                    className="fw-bold mb-0"
                    style={{ color: "#0B1F3A" }}
                  >
                    {orders.length}
                  </h2>
                </div>

                <i className="fa-solid fa-cart-shopping fs-1 text-primary"></i>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-1">
                    Новые заказы
                  </p>

                  <h2 className="fw-bold text-danger mb-0">
                    {
                      orders.filter(
                        (order) =>
                          !order.status || order.status === "new"
                      ).length
                    }
                  </h2>
                </div>

                <i className="fa-solid fa-bell fs-1 text-danger"></i>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-1">
                    Доставлено
                  </p>

                  <h2 className="fw-bold text-success mb-0">
                    {
                      orders.filter(
                        (order) => order.status === "completed"
                      ).length
                    }
                  </h2>
                </div>

                <i className="fa-solid fa-circle-check fs-1 text-success"></i>
              </div>
            </div>
          </div>

        </div>

        {/* ORDERS TITLE */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <div>
            <h3
              className="fw-bold mb-1"
              style={{ color: "#0B1F3A" }}
            >
              <i className="fa-solid fa-receipt me-2"></i>
              Все заказы
            </h3>

            <p className="text-secondary mb-0">
              Информация о заказах клиентов
            </p>
          </div>

          <span
            className="badge rounded-pill text-white px-3 py-2"
            style={{ background: "#174477" }}
          >
            {orders.length} заказов
          </span>
        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 text-center p-5">
            <i className="fa-solid fa-box-open fs-1 text-primary mb-3"></i>

            <h4
              className="fw-bold"
              style={{ color: "#0B1F3A" }}
            >
              Заказы не найдены
            </h4>

            <p className="text-secondary mb-0">
              Пока нет доступных заказов.
            </p>
          </div>
        ) : (

          /* ORDER CARDS */
          <div className="row g-4">
            {orders.map((order) => {
              const status = getStatusBadge(order.status);

              return (
                <div
                  className="col-md-6 col-xl-4"
                  key={order.id}
                >
                  <div
                    className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-7px)";

                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(11,31,58,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >

                    {/* CARD HEADER */}
                    <div
                      className="p-3 d-flex justify-content-between align-items-center"
                      style={{
                        background:
                          "linear-gradient(120deg, #0B1F3A, #174477)",
                        color: "white",
                      }}
                    >
                      <span className="fw-bold">
                        <i className="fa-solid fa-receipt me-2"></i>
                        Заказ #{order.id}
                      </span>

                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          background: status.bg,
                          color: status.color,
                        }}
                      >
                        {status.text}
                      </span>
                    </div>

                    {/* CARD BODY */}
                    <div className="card-body p-4">

                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4"
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "#E5EEFF",
                          color: "#174477",
                        }}
                      >
                        <i className="fa-solid fa-user fs-1"></i>
                      </div>

                      <h5
                        className="fw-bold text-center mb-4"
                        style={{ color: "#0B1F3A" }}
                      >
                        {order.customerName}
                      </h5>

                      <hr style={{ color: "#DCE5F1" }} />

                      <div className="mb-3">
                        <i className="fa-solid fa-user text-primary me-3"></i>
                        <strong>Клиент:</strong>
                        <span className="text-secondary ms-2">
                          {order.customerName}
                        </span>
                      </div>

                      <div className="mb-3">
                        <i className="fa-solid fa-phone text-primary me-3"></i>
                        <strong>Телефон:</strong>
                        <span className="text-secondary ms-2">
                          {order.customerPhone}
                        </span>
                      </div>

                      <div className="mb-3">
                        <i className="fa-solid fa-location-dot text-primary me-3"></i>
                        <strong>Адрес:</strong>
                        <p className="text-secondary ms-4 mb-0">
                          {order.address}
                        </p>
                      </div>

                      {order.totalAmount && (
                        <div
                          className="rounded-3 p-3 mt-3"
                          style={{ background: "#EAF1FB" }}
                        >
                          <i className="fa-solid fa-money-bill-wave me-2 text-primary"></i>

                          <strong style={{ color: "#174477" }}>
                            {order.totalAmount} сом
                          </strong>
                        </div>
                      )}

                    </div>

                    {/* CARD FOOTER */}
                    <div className="card-footer bg-white border-0 p-4 pt-0">

                      <a
                        href={`/editOrder/${order.id}`}
                        className="btn w-100 rounded-pill mb-3 fw-bold text-white"
                        style={{ background: "#174477" }}
                      >
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        Edit Order
                      </a>

                      <label
                        className="form-label fw-bold"
                        style={{ color: "#0B1F3A" }}
                      >
                        Изменить статус:
                      </label>

                      <select
                        className="form-select rounded-3 mb-3"
                        value={order.status || "new"}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value)
                        }
                      >
                        {statuses.map((status) => (
                          <option
                            key={status.value}
                            value={status.value}
                          >
                            {status.label}
                          </option>
                        ))}
                      </select>

                      <a
                        href={`/orders/${order.id}`}
                        className="btn btn-outline-primary rounded-pill w-100 fw-bold mb-2"
                      >
                        <i className="fa-solid fa-eye me-2"></i>
                        View Details
                      </a>

                      <button
                        className="btn btn-outline-danger rounded-pill w-100 fw-bold"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <i className="fa-solid fa-trash me-2"></i>
                        Delete Order
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Courier;
