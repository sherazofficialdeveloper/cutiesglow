// backend/src/seeds/users.js

import User from '../models/User.js';
import { hashPassword } from '../utils/password.js';

/**
 * Seed users data
 */
const seedUsers = async () => {
  try {
    // Check if users already exist
    const count = await User.countDocuments();
    if (count > 0) {
      console.log('⚠️  Users already exist. Skipping...');
      return;
    }

    const users = [
      {
        name: 'Admin User',
        email: 'admin@CutiesGlowbyrazias.com',
        password: 'Admin@123',
        phone: '+1 234 567 8900',
        role: 'admin',
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'John@123',
        phone: '+1 234 567 8901',
        role: 'customer',
        isActive: true,
        isEmailVerified: true,
        addresses: [
          {
            label: 'Home',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'US',
            isDefault: true,
          },
        ],
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'Jane@123',
        phone: '+1 234 567 8902',
        role: 'customer',
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'Alice@123',
        phone: '+1 234 567 8903',
        role: 'customer',
        isActive: true,
        isEmailVerified: false,
      },
    ];

    // Hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      }))
    );

    const created = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${created.length} users`);
    console.log(`  - Admin: ${users[0].email}`);
    console.log(`  - Customers: ${users.slice(1).map(u => u.email).join(', ')}`);

    return created;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

export default seedUsers;