# Use Node.js 22.17 Alpine
FROM node:22.17.0-alpine

# Set working directory
WORKDIR /app

# Enable Corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3000

# Start the dev server
CMD ["pnpm", "run", "dev"]
