# MySQL Database Setup Guide

## Step 1: Install MySQL

### Option A: MySQL Installer (Recommended)
1. Download MySQL Installer from: https://dev.mysql.com/downloads/installer/
2. Choose "Developer Default" setup type
3. Set root password during installation
4. Remember this password!

### Option B: XAMPP (Easier)
1. Download XAMPP from: https://www.apachefriends.org/download.html
2. Install and start MySQL service from XAMPP Control Panel

## Step 2: Create Database

After MySQL is installed, create the database:

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE srilanka_tourism;

-- Create a dedicated user (optional but recommended)
CREATE USER 'srilanka_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON srilanka_tourism.* TO 'srilanka_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

## Step 3: Environment Configuration

Create a `.env.local` file in your project root with:

```bash
# Database Configuration
DATABASE_URL="mysql://root:your_password@localhost:3306/srilanka_tourism"
# OR if you created a dedicated user:
# DATABASE_URL="mysql://srilanka_user:secure_password@localhost:3306/srilanka_tourism"

# NextAuth.js Configuration
NEXTAUTH_SECRET="your-super-secret-key-here-change-this-in-production"
NEXTAUTH_URL="http://localhost:3002"

# External API Keys (Optional for now)
UNSPLASH_ACCESS_KEY="your_unsplash_access_key_here"
GOOGLE_MAPS_API_KEY="your_google_maps_api_key_here"

# Development Environment
NODE_ENV="development"
```

## Step 4: Install Prisma and Generate Database

```bash
# Install Prisma CLI (if not already installed)
npm install prisma @prisma/client

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) View your database in Prisma Studio
npx prisma studio
```

## Step 5: Test Database Connection

The database should now be connected to your Next.js application. Test by:

1. Starting the development server: `npm run dev`
2. Try logging in with the mock credentials
3. Check if user data is being stored in the database

## Troubleshooting

### Common Issues:

1. **Connection Refused**: Make sure MySQL service is running
2. **Access Denied**: Check username/password in DATABASE_URL
3. **Database Not Found**: Make sure you created the database
4. **Port Issues**: Default MySQL port is 3306

### Windows Specific:
- Make sure MySQL service is running in Services.msc
- Check Windows Firewall settings
- Try using 127.0.0.1 instead of localhost

### Verification Commands:
```bash
# Test MySQL connection
mysql -u root -p -e "SHOW DATABASES;"

# Check if database exists
mysql -u root -p -e "USE srilanka_tourism; SHOW TABLES;"
```
