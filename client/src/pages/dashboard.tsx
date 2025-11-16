import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { getTasks } from "../redux/taskSlice";
import TaskForm from "../components/TaskForm";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../styles/DashboardStats.scss";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const inProgress = tasks.filter((task) => {
      if (task.completed) return false;
      if (!task.deadline) return false;
      const deadline = new Date(task.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return deadline >= today;
    }).length;
    const pending = total - completed - inProgress;

    return { total, completed, inProgress, pending };
  }, [tasks]);

  const chartData = useMemo(() => {
    const monthCounts: { [key: string]: number } = {};
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      monthCounts[monthKey] = 0;
    }

    tasks.forEach((task) => {
      const createdDate = task.deadline ? new Date(task.deadline) : new Date();
      const monthKey = `${
        monthNames[createdDate.getMonth()]
      } ${createdDate.getFullYear()}`;
      if (monthCounts.hasOwnProperty(monthKey)) {
        monthCounts[monthKey]++;
      }
    });

    return Object.entries(monthCounts).map(([month, total]) => ({
      month,
      total,
    }));
  }, [tasks]);

  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">TOTAL DE TAREFAS</p>
              <h2 className="stat-value">{stats.total}</h2>
              <p className="stat-period">Durante o mês</p>
            </div>
            <div className="stat-icon blue-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card teal">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">TAREFAS COMPLETADAS</p>
              <h2 className="stat-value">{stats.completed}</h2>
              <p className="stat-period">Durante o mês</p>
            </div>
            <div className="stat-icon teal-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">TAREFAS EM ANDAMENTO</p>
              <h2 className="stat-value">{stats.inProgress}</h2>
              <p className="stat-period">Durante o mês</p>
            </div>
            <div className="stat-icon orange-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card pink">
          <div className="stat-content">
            <div className="stat-info">
              <p className="stat-label">TAREFAS PENDENTES</p>
              <h2 className="stat-value">{stats.pending}</h2>
              <p className="stat-period">Durante o mês</p>
            </div>
            <div className="stat-icon pink-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Tarefas por Mês</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#718096", fontSize: 14 }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fill: "#718096", fontSize: 14 }}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar
              dataKey="total"
              fill="#667eea"
              radius={[8, 8, 0, 0]}
              name="Total de Tarefas"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
