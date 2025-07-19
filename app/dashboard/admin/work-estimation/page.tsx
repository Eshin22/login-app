"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WorkEstimationPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await axios.get("/api/admin/work-summary");
    setData(res.data);
  };

  const chartData = {
    labels: data.map((d) => d._id || "Unassigned"),
    datasets: [
      {
        label: "Assigned",
        data: data.map((d) => d.totalAssigned),
        backgroundColor: "rgba(59,130,246,0.7)", // blue
      },
      {
        label: "Reviewed",
        data: data.map((d) => d.reviewed),
        backgroundColor: "rgba(34,197,94,0.7)", // green
      },
      {
        label: "Printed",
        data: data.map((d) => d.printed),
        backgroundColor: "rgba(234,179,8,0.7)", // yellow
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-6">
        📊 Work Estimation Overview
      </h1>

      <div className="bg-gray-800 p-5 rounded-lg">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { labels: { color: "white" } },
            },
            scales: {
              x: { ticks: { color: "white" } },
              y: { ticks: { color: "white" } },
            },
          }}
        />
      </div>

      <div className="mt-6 space-y-4">
        {data.map((r, i) => (
          <div
            key={i}
            className="bg-gray-700 p-4 rounded-lg shadow hover:bg-gray-600"
          >
            <h2 className="text-lg font-semibold">{r._id || "Unassigned"}</h2>
            <p className="text-sm text-gray-300">
              Assigned: {r.totalAssigned} | Reviewed: {r.reviewed} | Printed:{" "}
              {r.printed}
            </p>
            <p className="text-sm text-gray-400">
              Avg Review Count: {r.avgReviewCount?.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
