"use client"
// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { Package, ShoppingBag, Layers, TrendingUp, LayoutDashboard } from "lucide-react";
import { apiFetch } from "@/lib/axios";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, o, c] = await Promise.all([
          apiFetch("/products"),
          apiFetch("/orders"),
          apiFetch("/categories")
        ]);

        setStats({
          products: p.length,
          orders: o.length,
          categories: c.length
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shadow-lg">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Dashboard Overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Here is what's happening today.
            </p>
          </div>
        </div>
        <div className="bg-card px-4 py-2 rounded-xl border flex items-center gap-2 text-sm font-bold text-primary">
          <TrendingUp className="w-4 h-4" />
          Live Metrics
        </div>
      </motion.header>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <StatCard 
          title="Total Products" 
          value={stats.products} 
          icon={<Package className="w-6 h-6" />}
          color="blue"
          trend="+12% this month"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.orders} 
          icon={<ShoppingBag className="w-6 h-6" />}
          color="emerald"
          trend="+5% vs last week"
        />
        <StatCard 
          title="Categories" 
          value={stats.categories} 
          icon={<Layers className="w-6 h-6" />}
          color="violet"
          trend="Optimized"
        />
      </motion.div>
    </div>
  );
}