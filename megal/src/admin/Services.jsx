import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { FiEdit, FiTrash2 } from "react-icons/fi";
export default function Services() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [serviceErrors, setServiceErrors] = useState({});
  const [editServiceId, setEditServiceId] = useState(null);

  const [equipments, setEquipments] = useState([]);
  const [equipmentForm, setEquipmentForm] = useState({
    type: "",
    brand: "",
    model: "",
    year: "",
    unit: "",
    qty: "",
    description: "",
  });
  const [equipmentErrors, setEquipmentErrors] = useState({});
  const [editEquipmentId, setEditEquipmentId] = useState(null);

  const [assets, setAssets] = useState([]);
  const [assetForm, setAssetForm] = useState({ name: "", image: null });
  const [assetErrors, setAssetErrors] = useState({});
  const [editAssetId, setEditAssetId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axiosInstance
      .get("/api/services")
      .then((res) => setServices(res.data));
    axiosInstance
      .get("/api/equipments")
      .then((res) => setEquipments(res.data));
    axiosInstance
      .get("/api/assets")
      .then((res) => setAssets(res.data));
  }, []);

  // ✅ Validation
  const validateService = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    setServiceErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateEquipment = () => {
    const errs = {};
    ["type", "brand", "model", "year", "unit", "qty"].forEach((key) => {
      if (!equipmentForm[key].trim()) errs[key] = `${key} is required`;
    });
    if (equipmentForm.year && !/^\d{4}$/.test(equipmentForm.year)) {
      errs.year = "Year must be a valid 4-digit number";
    }
    if (equipmentForm.qty && isNaN(equipmentForm.qty)) {
      errs.qty = "Quantity must be a number";
    }
    setEquipmentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAsset = () => {
    const errs = {};
    if (!assetForm.name.trim()) errs.name = "Name is required";
    if (!editAssetId && !assetForm.image) errs.image = "Image is required";
    setAssetErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ✅ Services
  const addOrUpdateService = async (e) => {
    e.preventDefault();
    if (!validateService()) return;

    try {
      if (editServiceId) {
        await axiosInstance.put(
          `/api/services/${editServiceId}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setServices(
          services.map((s) =>
            s._id === editServiceId ? { ...form, _id: editServiceId } : s
          )
        );
        setEditServiceId(null);
      } else {
        const res = await axiosInstance.post(
          "/api/services",
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setServices([...services, res.data]);
      }
      setForm({ title: "", description: "" });
      setServiceErrors({});
    } catch {
      alert("Failed to save service");
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axiosInstance.delete(`/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.filter((s) => s._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const handleEditService = (s) => {
    setForm(s);
    setEditServiceId(s._id);
  };

  // ✅ Equipment
  const addOrUpdateEquipment = async (e) => {
    e.preventDefault();
    if (!validateEquipment()) return;

    try {
      if (editEquipmentId) {
        await axiosInstance.put(
          `/api/equipments/${editEquipmentId}`,
          equipmentForm,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEquipments(
          equipments.map((eq) =>
            eq._id === editEquipmentId
              ? { ...equipmentForm, _id: editEquipmentId }
              : eq
          )
        );
        setEditEquipmentId(null);
      } else {
        const res = await axiosInstance.post(
          "/api/equipments",
          equipmentForm,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEquipments([...equipments, res.data]);
      }
      setEquipmentForm({
        type: "",
        brand: "",
        model: "",
        year: "",
        unit: "",
        qty: "",
        description: "",
      });
      setEquipmentErrors({});
    } catch {
      alert("Failed to save equipment");
    }
  };

  const handleEditEquipment = (eq) => {
    setEquipmentForm(eq);
    setEditEquipmentId(eq._id);
  };

  const deleteEquipment = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;
    try {
      await axiosInstance.delete(`/api/equipments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEquipments(equipments.filter((eq) => eq._id !== id));
    } catch {
      alert("Failed to delete equipment");
    }
  };

  // ✅ Assets
  const addOrUpdateAsset = async (e) => {
    e.preventDefault();
    if (!validateAsset()) return;

    const data = new FormData();
    data.append("name", assetForm.name);
    if (assetForm.image) data.append("image", assetForm.image);

    try {
      if (editAssetId) {
        const res = await axiosInstance.put(
          `/api/assets/${editAssetId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setAssets(assets.map((a) => (a._id === editAssetId ? res.data : a)));
        setEditAssetId(null);
      } else {
        const res = await axiosInstance.post("/api/assets", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setAssets([...assets, res.data]);
      }
      setAssetForm({ name: "", image: null });
      setAssetErrors({});
    } catch {
      alert("Failed to save asset");
    }
  };

  const deleteAsset = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    try {
      await axiosInstance.delete(`/api/assets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(assets.filter((a) => a._id !== id));
    } catch {
      alert("Failed to delete asset");
    }
  };

  const handleEditAsset = (asset) => {
    setAssetForm({ name: asset.name, image: null });
    setEditAssetId(asset._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Manage Services
        </h1>

        {/* Services Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Add / Edit Service
          </h2>
          <input
            type="text"
            placeholder="Service Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full mb-2 border p-2 rounded ${
              serviceErrors.title ? "border-red-500" : ""
            }`}
          />
          {serviceErrors.title && (
            <p className="text-red-500 text-sm">{serviceErrors.title}</p>
          )}
          <textarea
            placeholder="Service Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`w-full border p-2 rounded ${
              serviceErrors.description ? "border-red-500" : ""
            }`}
          />
          {serviceErrors.description && (
            <p className="text-red-500 text-sm">{serviceErrors.description}</p>
          )}
          <button
            onClick={addOrUpdateService}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editServiceId ? "Update Service" : "Add Service"}
          </button>
        </div>

        <div className="space-y-3">
          {services.map((s) => (
            <div
              key={s._id}
              className="border rounded p-3 flex justify-between items-center shadow-sm"
            >
              <div>
                <strong className="text-blue-800">{s.title}</strong>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEditService(s)}
                  className="text-green-600 hover:text-green-800"
                  aria-label="Edit"
                >
                  <FiEdit size={18} />
                </button>

                <button
                  onClick={() => deleteService(s._id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Equipment Section */}
        <hr className="my-10" />
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Manage Equipment
        </h2>

        <div className="mb-6 grid grid-cols-2 gap-4">
          {Object.keys(equipmentForm).map((key) => (
            <div key={key}>
              <input
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={equipmentForm[key]}
                onChange={(e) =>
                  setEquipmentForm({ ...equipmentForm, [key]: e.target.value })
                }
                className={`border p-2 rounded w-full ${
                  equipmentErrors[key] ? "border-red-500" : ""
                }`}
              />
              {equipmentErrors[key] && (
                <p className="text-red-500 text-sm">{equipmentErrors[key]}</p>
              )}
            </div>
          ))}
          <button
            onClick={addOrUpdateEquipment}
            className="col-span-2 mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editEquipmentId ? "Update Equipment" : "Add Equipment"}
          </button>
        </div>

        <table className="w-full table-auto text-sm border border-gray-300">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Model</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((eq) => (
              <tr key={eq._id} className="hover:bg-blue-50">
                <td className="p-2 border">{eq.type}</td>
                <td className="p-2 border">{eq.brand}</td>
                <td className="p-2 border">{eq.model}</td>
                <td className="p-2 border">{eq.year}</td>
                <td className="p-2 border">{eq.unit}</td>
                <td className="p-2 border">{eq.qty}</td>
                <td className="p-2 border">{eq.description}</td>
                <td className="p-2 border">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditEquipment(eq)}
                      className="text-green-600 hover:text-green-800"
                      aria-label="Edit"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={() => deleteEquipment(eq._id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Assets Section */}
        <hr className="my-10" />
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Manage Assets</h2>

        <div className="grid gap-3 mb-6">
          <input
            type="text"
            placeholder="Asset Name"
            value={assetForm.name}
            onChange={(e) =>
              setAssetForm({ ...assetForm, name: e.target.value })
            }
            className={`border p-2 rounded ${
              assetErrors.name ? "border-red-500" : ""
            }`}
          />
          {assetErrors.name && (
            <p className="text-red-500 text-sm">{assetErrors.name}</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setAssetForm({ ...assetForm, image: e.target.files[0] })
            }
            className={`border p-2 rounded ${
              assetErrors.image ? "border-red-500" : ""
            }`}
          />
          {assetErrors.image && (
            <p className="text-red-500 text-sm">{assetErrors.image}</p>
          )}
          <button
            onClick={addOrUpdateAsset}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {editAssetId ? "Update Asset" : "Add Asset"}
          </button>
        </div>

        <div className="grid gap-4">
          {assets.map((a) => (
            <div
              key={a._id}
              className="flex items-center justify-between border rounded p-3 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{a.name}</p>
                {a.image && (
                  <img
                    src={`${axiosInstance.defaults.baseURL}${a.image}`}
                    alt={a.name}
                    className="w-24 h-24 object-cover rounded mt-1"
                  />
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEditAsset(a)}
                  className="text-green-600 hover:text-green-800"
                  aria-label="Edit"
                >
                  <FiEdit size={18} />
                </button>

                <button
                  onClick={() => deleteAsset(a._id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
