# install new dependencies if any
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma
rm -rf package-lock.json
npm install
npx prisma generate
# uninstall the current bcrypt modules
npm uninstall bcrypt

# install the bcrypt modules for the machine
npm install bcrypt

echo "Starting API server"

npm run start:dev