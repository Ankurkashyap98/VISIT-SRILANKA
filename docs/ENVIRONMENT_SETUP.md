# Environment Setup Guide

## Required Environment Variables

To fix the admin portal access issues, you need to set up the following environment variables:

### 1. Create `.env.local` file in the project root

```bash
# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key-for-sri-lanka-tourism-app-2024-super-secure

# Database Configuration (Optional - for future use)
DATABASE_URL="mysql://username:password@localhost:3306/srilanka_tourism"

# Development Environment
NODE_ENV=development
```

### 2. Quick Setup Commands

#### Windows (PowerShell):
```powershell
# Create .env.local file
echo "NEXTAUTH_URL=http://localhost:3000" > .env.local
echo "NEXTAUTH_SECRET=development-secret-key-for-sri-lanka-tourism-app-2024-super-secure" >> .env.local
echo "NODE_ENV=development" >> .env.local
```

#### Windows (Command Prompt):
```cmd
echo NEXTAUTH_URL=http://localhost:3000 > .env.local
echo NEXTAUTH_SECRET=development-secret-key-for-sri-lanka-tourism-app-2024-super-secure >> .env.local
echo NODE_ENV=development >> .env.local
```

#### macOS/Linux:
```bash
cat > .env.local << EOF
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key-for-sri-lanka-tourism-app-2024-super-secure
NODE_ENV=development
EOF
```

### 3. Verify Setup

After creating the `.env.local` file:

1. **Restart your development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Test admin login** with demo credentials:
   - **Government Admin**: `admin@srilanka.gov.lk` / `admin123`
   - **Tourism Operator**: `operator@tourism.lk` / `operator123`
   - **Hotel Operator**: `host@hotel.lk` / `host123`

### 4. Troubleshooting

#### If you still get authentication errors:

1. **Check if .env.local exists**:
   ```bash
   ls -la .env.local  # macOS/Linux
   dir .env.local     # Windows
   ```

2. **Verify environment variables are loaded**:
   - Restart your development server completely
   - Clear browser cache and cookies
   - Check browser console for any remaining errors

3. **Check NextAuth configuration**:
   - Visit `http://localhost:3000/api/auth/providers` to verify NextAuth is working
   - Should return a JSON object with providers

#### Common Issues:

- **"NEXTAUTH_SECRET not found"**: Make sure `.env.local` file exists and has the correct variable name
- **"Authentication service unavailable"**: Restart the development server after creating `.env.local`
- **"Invalid credentials"**: Use the exact demo credentials provided above
- **"Access denied"**: Make sure you're using admin credentials (not tourist credentials)

### 5. Security Notes

⚠️ **Important**: The NEXTAUTH_SECRET used above is for development only. For production:

1. Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```

2. Use environment-specific secrets
3. Never commit `.env.local` to version control
4. Use proper secret management in production

### 6. Demo Credentials Reference

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| Government Admin | `admin@srilanka.gov.lk` | `admin123` | Full admin access |
| Tourism Operator | `operator@tourism.lk` | `operator123` | Operator portal |
| Hotel Operator | `host@hotel.lk` | `host123` | Hotel management |
| Regular Tourist | `tourist@example.com` | `tourist123` | Public portal only |

The admin portal will only allow users with `super_admin` or `admin` roles to access.
