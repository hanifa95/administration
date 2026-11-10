import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
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
          className: "bg-danger",
        };

      case "processing":
        return {
          text: "🟡 В обработке",
          className: "bg-warning text-dark",
        };

      case "delivery":
        return {
          text: "🚚 Доставляется",
          className: "bg-primary",
        };

      case "completed":
        return {
          text: "✅ Доставлено",
          className: "bg-success",
        };

      case "cancelled":
        return {
          text: "❌ Отменён",
          className: "bg-secondary",
        };

      default:
        return {
          text: "🆕 Новый",
          className: "bg-danger",
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
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4 border-start border-danger border-5">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <span className="badge bg-danger mb-2">ADMIN PANEL</span>

              <a
                href="/products"
                className=" btn btn-danger ms-3 fw-bold"
                // style={{ background: "#174477" }}
              >
                <i className="bi bi-box-seam me-2"></i>Products
              </a>

              <h2 className="fw-bold text-dark mb-2">
                <i className="fa-solid fa-user-shield text-danger me-2"></i>
                Панель администратора
              </h2>
              <p className="text-secondary mb-0">
                Управление заказами и контроль доставки
              </p>
            </div>

            <div className="bg-danger bg-opacity-10 rounded-4 p-3 text-center">
              <i className="fa-solid fa-cart-shopping text-danger fs-3"></i>
              <h3 className="fw-bold text-danger mb-0 mt-2">{orders.length}</h3>
              <small className="text-secondary">Всего заказов</small>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="row g-3 mb-5">
          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                  <i className="fa-solid fa-boxes-stacked text-danger fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{orders.length}</h3>
                  <small className="text-secondary">Все заказы</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                  <i className="fa-solid fa-clock text-warning fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0">
                    {orders.filter((o) => o.status === "processing").length}
                  </h3>
                  <small className="text-secondary">В обработке</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                  <i className="fa-solid fa-truck text-primary fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0">
                    {orders.filter((o) => o.status === "delivery").length}
                  </h3>
                  <small className="text-secondary">Доставка</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 rounded-3 p-3">
                  <i className="fa-solid fa-circle-check text-success fs-4"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-0">
                    {orders.filter((o) => o.status === "completed").length}
                  </h3>
                  <small className="text-secondary">Завершено</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            <i className="fa-solid fa-receipt text-danger me-2"></i>
            Список заказов
          </h4>

          <span className="badge bg-danger rounded-pill px-3 py-2">
            {orders.length} заказов
          </span>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="alert alert-warning text-center rounded-4 py-5 shadow-sm">
            <i className="fa-solid fa-box-open fs-1 d-block mb-3"></i>
            <h5 className="fw-bold">Заказы не найдены</h5>
            <p className="mb-0">Пока что заказов нет</p>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-md-6 col-xl-4" key={order.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  {/* Card Header */}
                  <div className="card-header bg-danger text-white border-0 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="opacity-75">НОМЕР ЗАКАЗА</small>
                        <h4 className="fw-bold mb-0">#{order.id}</h4>
                      </div>

                      <span
                        className={`badge ${
                          getStatusBadge(order.status).className
                        } rounded-pill px-3 py-2`}
                      >
                        {getStatusBadge(order.status).text}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                        <i className="fa-solid fa-user fs-5"></i>
                      </div>
                      <div>
                        <small className="text-secondary d-block">Клиент</small>
                        <strong>{order.customerName}</strong>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                        <i className="fa-solid fa-phone fs-5"></i>
                      </div>
                      <div>
                        <small className="text-secondary d-block">
                          Телефон
                        </small>
                        <strong>{order.customerPhone}</strong>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                        <i className="fa-solid fa-location-dot fs-5"></i>
                      </div>
                      <div>
                        <small className="text-secondary d-block">Адрес</small>
                        <strong className="text-break">{order.address}</strong>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3">
                        <i className="fa-solid fa-weight-hanging fs-5"></i>
                      </div>
                      <div>
                        <small className="text-secondary d-block">
                          Вес товара
                        </small>
                        <strong>{order.weight}</strong>
                      </div>
                    </div>

                    {/* Заказанные товары */}
                    <div className="card border-0 bg-light rounded-4 mb-4">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold mb-0">
                            <i className="fa-solid fa-box-open text-danger me-2"></i>
                            Заказанные товары
                          </h6>

                          <span className="badge bg-danger rounded-pill">
                            {order.items?.length || 0} товаров
                          </span>
                        </div>

                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <div
                              key={item.id || index}
                              className="d-flex justify-content-between align-items-center border-bottom py-3"
                            >
                              <div className="d-flex align-items-center gap-2">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.title || item.name}
                                    className="rounded-3"
                                    style={{
                                      width: "55px",
                                      height: "55px",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}

                                <div>
                                  <strong className="d-block">
                                    {item.title ||
                                      item.name ||
                                      item.description}
                                  </strong>

                                  <small className="text-muted">
                                    {item.count || 1} шт. ×{" "}
                                    {Number(item.price || 0).toLocaleString(
                                      "ru-RU"
                                    )}{" "}
                                    сом
                                  </small>
                                </div>
                              </div>

                              <strong className="text-success text-nowrap">
                                {(
                                  Number(item.price || 0) *
                                  Number(item.count || 1)
                                ).toLocaleString("ru-RU")}{" "}
                                сом
                              </strong>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted text-center mb-0 py-2">
                            Товары не найдены
                          </p>
                        )}
                      </div>
                    </div>

                    {order.totalAmount && (
                      <div className="bg-success bg-opacity-10 rounded-4 p-3 d-flex justify-content-between align-items-center">
                        <div>
                          <small className="text-secondary">
                            Общая стоимость
                          </small>
                          <h4 className="text-success fw-bold mb-0">
                            {order.totalAmount} сом
                          </h4>
                        </div>
                        <i className="fa-solid fa-money-bill-wave text-success fs-2"></i>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer bg-white border-top p-3">
                    <label className="form-label fw-bold small">
                      <i className="fa-solid fa-rotate me-2 text-danger"></i>
                      Изменить статус
                    </label>

                    <select
                      className="form-select rounded-3 mb-3"
                      value={order.status || "new"}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>

                    <div className="row g-2">
                      <div className="col-6">
                        <a
                          href={`/editOrder/${order.id}`}
                          className="btn btn-success w-100 rounded-3"
                        >
                          <i className="fa-solid fa-pen me-2"></i>
                          Edit
                        </a>
                      </div>

                      <div className="col-6">
                        <a
                          href={`/orders/${order.id}`}
                          className="btn btn-outline-primary w-100 rounded-3"
                        >
                          <i className="fa-solid fa-eye me-2"></i>
                          Details
                        </a>
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-outline-danger w-100 rounded-3"
                          onClick={() => deleteOrder(order.id)}
                        >
                          <i className="fa-solid fa-trash me-2"></i>
                          Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
