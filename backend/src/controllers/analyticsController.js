// backend/src/controllers/analyticsController.js

import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [revenueResult, ordersCount, customersCount, productsCount] = await Promise.all([
      Order.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Product.countDocuments(),
    ]);

    const revenue = revenueResult[0]?.total || 0;

    res.json({
      success: true,
      data: {
        revenue,
        orders: ordersCount,
        customers: customersCount,
        products: productsCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getSalesAnalytics = async (req, res, next) => {
  try {
    const { period = 'month' } = req.query;
    const data = [
      { label: 'Jan', value: 1200 },
      { label: 'Feb', value: 900 },
      { label: 'Mar', value: 1500 },
      { label: 'Apr', value: 1800 },
      { label: 'May', value: 2100 },
      { label: 'Jun', value: 2400 },
    ];
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopProducts = async (req, res, next) => {
  try {
    const { limit = 5 } = req.query;
    const topProducts = await Product.find()
      .sort({ soldCount: -1 })
      .limit(parseInt(limit))
      .select('name price soldCount images');
    res.json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    next(error);
  }
};