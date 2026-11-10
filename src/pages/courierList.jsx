import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://695ff14b7f037703a81543ad.mockapi.io/courier";

const CourierList = () => {
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Получение курьеров
  const fetchCouriers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);
      setCouriers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCouriers();
  }, []);

  // Удаление курьера
  const deleteCourier = async (id) => {
    const confirmDelete = window.confirm(
      "Вы действительно хотите удалить этого курьера?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setCouriers((prev) => prev.filter((courier) => courier.id !== id));

      alert("Курьер успешно удалён!");
    } catch (error) {
      console.error(error);
      alert("Ошибка при удалении");
    }
  };

  // Изменение статуса
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });

      setCouriers((prev) =>
        prev.map((courier) =>
          courier.id === id ? { ...courier, status } : courier
        )
      );
    } catch (error) {
      console.error(error);
      alert("Не удалось изменить статус");
    }
  };

  // Статусы
  const getStatusBadge = (status) => {
    const statusData = {
      new: {
        text: "Новый",
        icon: "fa-circle-plus",
        color: "#DC3545",
        bg: "#FCE8EB",
      },
      processing: {
        text: "В обработке",
        icon: "fa-clock",
        color: "#B7791F",
        bg: "#FFF4D6",
      },
      delivery: {
        text: "Доставляется",
        icon: "fa-truck-fast",
        color: "#2563EB",
        bg: "#E5EEFF",
      },
      completed: {
        text: "Доставлено",
        icon: "fa-circle-check",
        color: "#198754",
        bg: "#E2F5EA",
      },
      cancelled: {
        text: "Отменён",
        icon: "fa-circle-xmark",
        color: "#64748B",
        bg: "#E9EEF4",
      },
    };

    return statusData[status] || statusData.new;
  };

  const statuses = [
    { value: "new", label: "🆕 Новый" },
    { value: "processing", label: "🟡 В обработке" },
    { value: "delivery", label: "🚚 Доставляется" },
    { value: "completed", label: "✅ Доставлено" },
    { value: "cancelled", label: "❌ Отменён" },
  ];

  // Статистика
  const completedCount = couriers.filter(
    (item) => item.status === "completed"
  ).length;

  const deliveryCount = couriers.filter(
    (item) => item.status === "delivery"
  ).length;

  const newCount = couriers.filter(
    (item) => !item.status || item.status === "new"
  ).length;

  return (
    <div className="min-vh-100 py-5" style={{ background: "#F1F5FB" }}>
      <div className="container">
        {/* HEADER */}
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4 mb-4 rounded-4 shadow"
          style={{
            background: "linear-gradient(120deg, #0B1F3A, #174477)",
            color: "white",
          }}
        >
          <div>
            <h2 className="fw-bold mb-2">
              <i className="fa-solid fa-user-shield text-info me-3"></i>
              Панель курьера
            </h2>

            <p className="text-info mb-0">
              Управление курьерами и доставкой заказов
            </p>
          </div>

          <a
            href="/courierList"
            className="btn btn-light rounded-pill px-4 fw-bold ms-5"
            style={{ color: "#0B1F3A" }}
          >
            <i className="fa-solid fa-users me-2"></i>
            Courier List
          </a>

          <a
            href="/products"
            className=" btn btn-light rounded-pill px-4 fw-bold"
            // style={{ background: "#174477" }}
          >
            <i className="bi bi-box-seam me-2"></i>Products
          </a>
        </div>

        {/* STATISTICS */}
        <div className="row g-3 mb-5">
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-1">Всего курьеров</p>
                  <h2 className="fw-bold mb-0" style={{ color: "#0B1F3A" }}>
                    {couriers.length}
                  </h2>
                </div>
                <i className="fa-solid fa-users fs-1 text-primary"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-1">Новые</p>
                  <h2 className="fw-bold text-danger mb-0">{newCount}</h2>
                </div>
                <i className="fa-solid fa-bell fs-1 text-danger"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-1">В доставке</p>
                  <h2 className="fw-bold text-primary mb-0">{deliveryCount}</h2>
                </div>
                <i className="fa-solid fa-truck-fast fs-1 text-primary"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-1">Доставлено</p>
                  <h2 className="fw-bold text-success mb-0">
                    {completedCount}
                  </h2>
                </div>
                <i className="fa-solid fa-circle-check fs-1 text-success"></i>
              </div>
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <div>
            <h3 className="fw-bold mb-1" style={{ color: "#0B1F3A" }}>
              <i className="fa-solid fa-id-card me-2"></i>
              Список курьеров
            </h3>
            <p className="text-secondary mb-0">
              Информация и управление курьерами
            </p>
          </div>

          <span
            className="badge rounded-pill text-white px-3 py-2"
            style={{ background: "#174477" }}
          >
            {couriers.length} курьеров
          </span>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "#174477" }}></div>
            <p className="text-secondary mt-3">Загрузка курьеров...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && couriers.length === 0 && (
          <div className="card border-0 shadow-sm rounded-4 text-center p-5">
            <i className="fa-solid fa-box-open fs-1 text-primary mb-3"></i>
            <h4 className="fw-bold" style={{ color: "#0B1F3A" }}>
              Курьеры не найдены
            </h4>
            <p className="text-secondary mb-0">
              Пока нет зарегистрированных курьеров.
            </p>
          </div>
        )}

        {/* COURIER CARDS */}
        {!loading && couriers.length > 0 && (
          <div className="row g-4">
            {couriers.map((courier) => {
              const status = getStatusBadge(courier.status);

              return (
                <div className="col-md-6 col-xl-4" key={courier.id}>
                  <div
                    className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-7px)";
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
                        background: "linear-gradient(120deg, #0B1F3A, #174477)",
                        color: "white",
                      }}
                    >
                      <span className="fw-bold">
                        <i className="fa-solid fa-user me-2"></i>
                        Курьер #{courier.id}
                      </span>

                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          background: status.bg,
                          color: status.color,
                        }}
                      >
                        <i className={`fa-solid ${status.icon} me-1`}></i>
                        {status.text}
                      </span>
                    </div>

                    {/* CARD BODY */}
                    <div className="card-body p-4">
                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4"
                        style={{
                          width: "85px",
                          height: "85px",
                          background: "#E5EEFF",
                          color: "#174477",
                        }}
                      >
                        <i className="fa-solid fa-user-tie fs-1"></i>
                      </div>

                      <h4
                        className="text-center fw-bold mb-4"
                        style={{ color: "#0B1F3A" }}
                      >
                        {courier.name || "Без имени"}
                      </h4>

                      <hr style={{ color: "#DCE5F1" }} />

                      <div className="mb-3">
                        <i className="fa-solid fa-phone text-primary me-3"></i>
                        <strong>Телефон:</strong>
                        <span className="text-secondary ms-2">
                          {courier.phone || "Не указан"}
                        </span>
                      </div>

                      <div className="mb-3">
                        <i className="fa-solid fa-envelope text-primary me-3"></i>
                        <strong>Email:</strong>
                        <span className="text-secondary ms-2">
                          {courier.email || "Не указан"}
                        </span>
                      </div>

                      <div className="mb-3">
                        <i className="fa-solid fa-star text-warning me-3"></i>
                        <strong>Рейтинг:</strong>
                        <span className="text-secondary ms-2">
                          {courier.rating || "Нет рейтинга"} ⭐
                        </span>
                      </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="card-footer bg-white border-0 p-4 pt-0">
                      <a
                        href={`/editOrder/${courier.id}`}
                        className="btn w-100 rounded-pill mb-3 fw-bold text-white"
                        style={{ background: "#174477" }}
                      >
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        Edit
                      </a>

                      <label
                        className="form-label fw-bold"
                        style={{ color: "#0B1F3A" }}
                      >
                        Изменить статус:
                      </label>

                      <select
                        className="form-select rounded-3 mb-3"
                        value={courier.status || "new"}
                        onChange={(e) =>
                          updateStatus(courier.id, e.target.value)
                        }
                      >
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>

                      <a
                        href={`/orders/${courier.id}`}
                        className="btn btn-outline-primary rounded-pill w-100 fw-bold mb-2"
                      >
                        <i className="fa-solid fa-eye me-2"></i>
                        View Details
                      </a>

                      <button
                        className="btn btn-outline-danger rounded-pill w-100 fw-bold"
                        onClick={() => deleteCourier(courier.id)}
                      >
                        <i className="fa-solid fa-trash me-2"></i>
                        Delete
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

export default CourierList;
